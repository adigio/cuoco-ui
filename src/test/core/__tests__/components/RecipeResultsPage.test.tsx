// src/test/core/__tests__/components/RecipeResultsPage.test.tsx

// 1) Mocks globales **antes** de los imports
jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));
jest.mock("@/store/useRecipesStore", () => ({ useRecipesStore: jest.fn() }));
jest.mock("@/store/useIngredientsStore", () => ({ useIngredientsStore: jest.fn() }));

jest.mock("@/components/shared/BackgroundLayers", () => () => (
  <div data-testid="background-layers" />
));
jest.mock("@/components/shared/containers/Container", () => (props: any) => (
  <div data-testid="container">{props.children}</div>
));
jest.mock("@/components/shared/skeleton/RecipeCardSkeleton", () => ({
  RecipeCardSkeleton: () => <div data-testid="skeleton" />,
}));
jest.mock("@/components/shared/cards/RecipeCard", () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid="recipe-card">
      <div data-testid="recipe-name">{props.recipe.name}</div>
      <div data-testid="prep-time">{props.recipe.preparationTime}</div>
      {/* props.children incluye los botones de favorito y refresh */}
      <div data-testid="actions">{props.children}</div>
    </div>
  ),
}));
jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span data-testid="fa-icon" />,
}));
jest.mock("@/components/shared/modal/FavoriteModal", () => ({
  FavoriteModal: (p: any) =>
    p.isOpen ? <div data-testid="favorite-modal" /> : null,
}));
jest.mock("@/components/shared/modal/RefreshModal", () => ({
  RefreshModal: (p: any) =>
    p.isOpen ? (
      <div data-testid="refresh-modal">
        <button data-testid="upgrade-button" onClick={p.onUpgrade}>
          Upgrade
        </button>
      </div>
    ) : null,
}));
jest.mock("@/components/shared/modal/SubscriptionModal", () => (p: any) =>
  p.isOpen ? <div data-testid="subscription-modal" /> : null
);

// 2) Ahora sí, imports reales
import React from "react";
import { render, screen, fireEvent, act, within } from "@testing-library/react";
import RecipeResultsPage from "@/app/(application)/(generator)/results/page";
import { useRouter } from "next/navigation";
import { useRecipesStore } from "@/store/useRecipesStore";
import { useIngredientsStore } from "@/store/useIngredientsStore";

const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockedUseRecipes = useRecipesStore as jest.MockedFunction<
  typeof useRecipesStore
>;
const mockedUseIngredients = useIngredientsStore as jest.MockedFunction<
  typeof useIngredientsStore
>;

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

    const store = {
      filteredRecipes: [],
      ingredients: sampleIngredients,
    };

    mockedUseRecipes.mockImplementation((selector: any) =>
      selector ? selector(store) : store
    );
    mockedUseIngredients.mockImplementation((selector: any) =>
      selector ? selector(store) : store
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
    mockedUseRecipes.mockImplementation((selector: any) =>
      selector ? selector({ ...{ filteredRecipes: sampleRecipes, ingredients: sampleIngredients } }) : { filteredRecipes: sampleRecipes, ingredients: sampleIngredients }
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
    mockedUseRecipes.mockImplementation((selector: any) =>
      selector ? selector({ ...{ filteredRecipes: sampleRecipes, ingredients: sampleIngredients } }) : { filteredRecipes: sampleRecipes, ingredients: sampleIngredients }
    );

    render(<RecipeResultsPage />);
    act(() => jest.advanceTimersByTime(3000));

    fireEvent.click(
      screen.getByRole("button", { name: /Volver a ingredientes/i })
    );
    expect(pushMock).toHaveBeenCalledWith("/filters");

    fireEvent.click(
      screen.getByRole("button", { name: /Nuevo generador/i })
    );
    expect(pushMock).toHaveBeenCalledWith("/recipe-generator");
  });

  it("al hacer refresh abre RefreshModal y luego SubscriptionModal al upgrade", async () => {
    mockedUseRecipes.mockImplementation((selector: any) =>
      selector ? selector({ ...{ filteredRecipes: sampleRecipes, ingredients: sampleIngredients } }) : { filteredRecipes: sampleRecipes, ingredients: sampleIngredients }
    );

    render(<RecipeResultsPage />);
    act(() => jest.advanceTimersByTime(3000));

    // buscamos el primer botón de "refresh" dentro de la tarjeta
    const firstCard = (await screen.findAllByTestId("recipe-card"))[0];
    const actionButtons = within(firstCard).getAllByRole("button");
    const refreshBtn = actionButtons[0]; // asume que el primero es refresh
    fireEvent.click(refreshBtn);

    expect(await screen.findByTestId("refresh-modal")).toBeInTheDocument();
    fireEvent.click(await screen.findByTestId("upgrade-button"));
    expect(await screen.findByTestId("subscription-modal")).toBeInTheDocument();
  });

  it("al hacer favorito abre FavoriteModal", async () => {
    mockedUseRecipes.mockImplementation((selector: any) =>
      selector ? selector({ ...{ filteredRecipes: sampleRecipes, ingredients: sampleIngredients } }) : { filteredRecipes: sampleRecipes, ingredients: sampleIngredients }
    );

    render(<RecipeResultsPage />);
    act(() => jest.advanceTimersByTime(3000));

    const firstCard = (await screen.findAllByTestId("recipe-card"))[0];
    const actionButtons = within(firstCard).getAllByRole("button");
    const favoriteBtn = actionButtons[1]; // asume que el segundo es favorite
    fireEvent.click(favoriteBtn);

    expect(await screen.findByTestId("favorite-modal")).toBeInTheDocument();
  });
});
