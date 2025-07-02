// src/test/core/__tests__/components/RecipeResultsPage.test.tsx

// Mocks globales
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: () => "/results",
}));

jest.mock("@/store/useRecipesStore");
jest.mock("@/store/useIngredientsStore");

jest.mock("@/components/shared/BackgroundLayers", () => {
  const React = require("react");
  return () => <div data-testid="background-layers" />;
});

jest.mock("@/components/shared/containers/Container", () => {
  const React = require("react");
  return (props: any) => <div data-testid="container">{props.children}</div>;
});

jest.mock("@/components/shared/skeleton/RecipeCardSkeleton", () => {
  const React = require("react");
  return {
    RecipeCardSkeleton: () => <div data-testid="skeleton" />,
  };
});

jest.mock("@/components/shared/cards/RecipeCard", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: (props: any) => (
      <div data-testid="recipe-card">
        <div data-testid="recipe-name">{props.recipe.name}</div>
        <div data-testid="prep-time">{props.recipe.preparationTime}</div>
        <div>{props.children}</div>
      </div>
    ),
  };
});

jest.mock("@/components/shared/modal/FavoriteModal", () => {
  const React = require("react");
  return {
    FavoriteModal: (props: any) =>
      props.isOpen ? <div data-testid="favorite-modal" /> : null,
  };
});

jest.mock("@/components/shared/modal/RefreshModal", () => {
  const React = require("react");
  return {
    RefreshModal: (props: any) =>
      props.isOpen ? (
        <div data-testid="refresh-modal">
          <button data-testid="upgrade-button" onClick={props.onUpgrade}>
            Upgrade
          </button>
        </div>
      ) : null,
  };
});

jest.mock("@/components/shared/modal/SubscriptionModal", () => {
  const React = require("react");
  return (props: any) =>
    props.isOpen ? <div data-testid="subscription-modal" /> : null;
});

// Imports reales
import React from "react";
import { render, screen, fireEvent, act, within } from "@testing-library/react";
import RecipeResultsPage from "@/app/(application)/(generator)/results/page";
import { useRouter } from "next/navigation";
import * as recipesStoreModule from "@/store/useRecipesStore";
import * as ingredientsStoreModule from "@/store/useIngredientsStore";

// Aliases
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

    mockedUseRouter.mockReturnValue({
      push: pushMock,
      back: jest.fn(),
      forward: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
    } as any);

    mockedUseIngredients.mockImplementation((selector?: any) => {
      const store = {
        clearIngredientsIfNeeded: jest.fn(),
        startGeneratorSession: jest.fn(),
        endGeneratorSession: jest.fn(), // ✅ agregado para evitar el error
        ingredients: sampleIngredients,
      };
      return selector ? selector(store) : store;
    });

    mockedUseRecipes.mockImplementation((selector?: any) => {
      const store = {
        filteredRecipes: [],
      };
      return selector ? selector(store) : store;
    });
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
    mockedUseRecipes.mockImplementation((selector?: any) => {
      const store = {
        filteredRecipes: sampleRecipes,
      };
      return selector ? selector(store) : store;
    });

    render(<RecipeResultsPage />);
    act(() => jest.advanceTimersByTime(3000));

    const cards = await screen.findAllByTestId("recipe-card");
    expect(cards).toHaveLength(2);

    const sopaCard = screen.getByText("Sopa").closest('[data-testid="recipe-card"]') as HTMLElement;
    expect(sopaCard).not.toBeNull();
    expect(within(sopaCard).getByTestId("prep-time")).toHaveTextContent("10");

    const ensaladaCard = screen.getByText("Ensalada").closest('[data-testid="recipe-card"]') as HTMLElement;
    expect(ensaladaCard).not.toBeNull();
    expect(within(ensaladaCard).getByTestId("prep-time")).toHaveTextContent("5");
  });

 it("navega correctamente con los botones de abajo", async () => {
  mockedUseRecipes.mockImplementation((selector?: any) => {
    const store = {
      filteredRecipes: sampleRecipes,
    };
    return selector ? selector(store) : store;
  });

  (ingredientsStoreModule.useIngredientsStore as any).getState = () => ({
    endGeneratorSession: jest.fn(),
  });

  render(<RecipeResultsPage />);
  act(() => jest.advanceTimersByTime(3000));

  fireEvent.click(screen.getByRole("button", { name: /Volver a ingredientes/i }));
  expect(pushMock).toHaveBeenCalledWith("/filters");

  fireEvent.click(screen.getByRole("button", { name: /Nuevo generador/i }));
  expect(pushMock).toHaveBeenCalledWith("/recipe-generator");
});



  it("al hacer refresh abre RefreshModal y luego SubscriptionModal al upgrade", async () => {
    mockedUseRecipes.mockImplementation((selector?: any) => {
      const store = {
        filteredRecipes: sampleRecipes,
      };
      return selector ? selector(store) : store;
    });

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
    mockedUseRecipes.mockImplementation((selector?: any) => {
      const store = {
        filteredRecipes: sampleRecipes,
      };
      return selector ? selector(store) : store;
    });

    render(<RecipeResultsPage />);
    act(() => jest.advanceTimersByTime(3000));

    const firstCard = (await screen.findAllByTestId("recipe-card"))[0];
    const [, favoriteBtn] = within(firstCard).getAllByRole("button");
    fireEvent.click(favoriteBtn);

    expect(await screen.findByTestId("favorite-modal")).toBeInTheDocument();
  });
});
