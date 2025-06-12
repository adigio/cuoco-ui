// src/test/core/__tests__/components/RecipeResultsPage.test.tsx

// 1) Mocks globales **antes** de los imports
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mockeamos los módulos de Zustand para usar jest.mocked
jest.mock("@/store/useRecipesStore");
jest.mock("@/store/useIngredientsStore");

// 2) Mocks de componentes con displayName
jest.mock("@/components/shared/BackgroundLayers", () => {
  const React = require("react");
  function BackgroundLayers() {
    return <div data-testid="background-layers" />;
  }
  BackgroundLayers.displayName = "BackgroundLayers";
  return BackgroundLayers;
});

jest.mock("@/components/shared/containers/Container", () => {
  const React = require("react");
  function Container(props: any) {
    return <div data-testid="container">{props.children}</div>;
  }
  Container.displayName = "Container";
  return Container;
});

jest.mock("@/components/shared/skeleton/RecipeCardSkeleton", () => {
  const React = require("react");
  function RecipeCardSkeleton() {
    return <div data-testid="skeleton" />;
  }
  RecipeCardSkeleton.displayName = "RecipeCardSkeleton";
  return { RecipeCardSkeleton };
});

jest.mock("@/components/shared/cards/RecipeCard", () => {
  const React = require("react");
  function RecipeCard(props: any) {
    return (
      <div data-testid="recipe-card">
        <div data-testid="recipe-name">{props.recipe.name}</div>
        <div data-testid="prep-time">{props.recipe.preparationTime}</div>
        <div data-testid="actions">{props.children}</div>
      </div>
    );
  }
  RecipeCard.displayName = "RecipeCard";
  return { __esModule: true, default: RecipeCard };
});

jest.mock("@fortawesome/react-fontawesome", () => {
  const React = require("react");
  function FontAwesomeIcon() {
    return <span data-testid="fa-icon" />;
  }
  FontAwesomeIcon.displayName = "FontAwesomeIcon";
  return { FontAwesomeIcon };
});

jest.mock("@/components/shared/modal/FavoriteModal", () => {
  const React = require("react");
  function FavoriteModal(props: any) {
    return props.isOpen ? <div data-testid="favorite-modal" /> : null;
  }
  FavoriteModal.displayName = "FavoriteModal";
  return { FavoriteModal };
});

jest.mock("@/components/shared/modal/RefreshModal", () => {
  const React = require("react");
  function RefreshModal(props: any) {
    return props.isOpen ? (
      <div data-testid="refresh-modal">
        <button data-testid="upgrade-button" onClick={props.onUpgrade}>
          Upgrade
        </button>
      </div>
    ) : null;
  }
  RefreshModal.displayName = "RefreshModal";
  return { RefreshModal };
});

jest.mock("@/components/shared/modal/SubscriptionModal", () => {
  const React = require("react");
  function SubscriptionModal(props: any) {
    return props.isOpen ? <div data-testid="subscription-modal" /> : null;
  }
  SubscriptionModal.displayName = "SubscriptionModal";
  return SubscriptionModal;
});

// 3) Ahora sí, imports reales
import React from "react";
import { render, screen, fireEvent, act, within } from "@testing-library/react";
import RecipeResultsPage from "@/app/(application)/(generator)/results/page";
import { useRouter } from "next/navigation";
import * as recipesStoreModule from "@/store/useRecipesStore";
import * as ingredientsStoreModule from "@/store/useIngredientsStore";

// 4) Creamos alias tipados para los hooks mockeados
const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockedUseRecipes = jest.mocked(recipesStoreModule.useRecipesStore);
const mockedUseIngredients = jest.mocked(ingredientsStoreModule.useIngredientsStore);

describe("RecipeResultsPage", () => {
  const pushMock = jest.fn();
  const sampleRecipes = [
    { id: 1, name: "Sopa", preparationTime: 10 },
    { id: 2, name: "Ensalada", preparationTime: 5 },
  ];
  const sampleIngredients = [
    { name: "tomate", origin: "manual", confirm: true },
    { name: "cebolla", origin: "imagen", confirm: false },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    // Mockeamos useRouter
    mockedUseRouter.mockReturnValue({
      push: pushMock,
      back: jest.fn(),
      forward: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
    } as any);

    // Valor inicial del store
    const baseStore = {
      filteredRecipes: [] as typeof sampleRecipes,
      ingredients: sampleIngredients,
    };

    mockedUseRecipes.mockImplementation((selector?: any) =>
      selector ? selector(baseStore) : baseStore
    );
    mockedUseIngredients.mockImplementation((selector?: any) =>
      selector ? selector(baseStore) : baseStore
    );
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("muestra 4 skeletons mientras carga", () => {
    render(<RecipeResultsPage />);
    expect(screen.getAllByTestId("skeleton")).toHaveLength(4);
  });

  it("si no hay recetas tras carga muestra mensaje y botón de volver", async () => {
    render(<RecipeResultsPage />);
    act(() => jest.advanceTimersByTime(3000));

    expect(
      await screen.findByText("No se encontraron recetas con tus ingredientes.")
    ).toBeInTheDocument();

    fireEvent.click(
      await screen.findByRole("button", {
        name: /Volver a seleccionar ingredientes/i,
      })
    );
    expect(pushMock).toHaveBeenCalledWith("/filters");
  });

  it("muestra recetas con nombre y tiempo tras carga", async () => {
    // Override para que haya recetas
    mockedUseRecipes.mockImplementation((selector?: any) =>
      selector
        ? selector({ filteredRecipes: sampleRecipes, ingredients: sampleIngredients })
        : { filteredRecipes: sampleRecipes, ingredients: sampleIngredients }
    );

    render(<RecipeResultsPage />);
    act(() => jest.advanceTimersByTime(3000));

    const cards = await screen.findAllByTestId("recipe-card");
    expect(cards).toHaveLength(2);
    expect(screen.getByText("Sopa")).toBeInTheDocument();
    expect(screen.getByText("Ensalada")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("navega correctamente con los botones de abajo", async () => {
    // Override para que haya recetas
    mockedUseRecipes.mockImplementation((selector?: any) =>
      selector
        ? selector({ filteredRecipes: sampleRecipes, ingredients: sampleIngredients })
        : { filteredRecipes: sampleRecipes, ingredients: sampleIngredients }
    );

    render(<RecipeResultsPage />);
    act(() => jest.advanceTimersByTime(3000));

    fireEvent.click(screen.getByRole("button", { name: /Volver a ingredientes/i }));
    expect(pushMock).toHaveBeenCalledWith("/filters");

    fireEvent.click(screen.getByRole("button", { name: /Nuevo generador/i }));
    expect(pushMock).toHaveBeenCalledWith("/recipe-generator");
  });

  it("al hacer refresh abre RefreshModal y luego SubscriptionModal al upgrade", async () => {
    // Override para que haya recetas
    mockedUseRecipes.mockImplementation((selector?: any) =>
      selector
        ? selector({ filteredRecipes: sampleRecipes, ingredients: sampleIngredients })
        : { filteredRecipes: sampleRecipes, ingredients: sampleIngredients }
    );

    render(<RecipeResultsPage />);
    act(() => jest.advanceTimersByTime(3000));

    const firstCard = (await screen.findAllByTestId("recipe-card"))[0];
    const [refreshBtn] = within(firstCard).getAllByRole("button");
    fireEvent.click(refreshBtn);

    expect(await screen.findByTestId("refresh-modal")).toBeInTheDocument();
    fireEvent.click(await screen.findByTestId("upgrade-button"));
    expect(await screen.findByTestId("subscription-modal")).toBeInTheDocument();
  });

  it("al hacer favorito abre FavoriteModal", async () => {
    // Override para que haya recetas
    mockedUseRecipes.mockImplementation((selector?: any) =>
      selector
        ? selector({ filteredRecipes: sampleRecipes, ingredients: sampleIngredients })
        : { filteredRecipes: sampleRecipes, ingredients: sampleIngredients }
    );

    render(<RecipeResultsPage />);
    act(() => jest.advanceTimersByTime(3000));

    const firstCard = (await screen.findAllByTestId("recipe-card"))[0];
    const [, favoriteBtn] = within(firstCard).getAllByRole("button");
    fireEvent.click(favoriteBtn);

    expect(await screen.findByTestId("favorite-modal")).toBeInTheDocument();
  });
});
