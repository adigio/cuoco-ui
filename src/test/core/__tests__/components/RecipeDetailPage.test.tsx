// src/test/core/__tests__/components/RecipeDetailPage.test.tsx

// 0) Mock de react.use para que use(params) simplemente devuelva params
jest.mock("react", () => {
  const ActualReact = jest.requireActual("react");
  return {
    ...ActualReact,
    use: (v: any) => v,
  };
});

// 1) Mocks de next/navigation, servicios y componentes hijos
jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));
jest.mock("@/services/recipe.service", () => ({ getRecipeById: jest.fn() }));
jest.mock("@/components/shared/BackgroundLayers", () => () => (
  <div data-testid="background-layers" />
));
jest.mock("@/components/shared/containers/ContainerShadow", () => (props: any) => (
  <div data-testid="container-shadow">{props.children}</div>
));
jest.mock("@/components/shared/skeleton/RecipeDetailSkeleton", () => ({
  RecipeDetailSkeleton: () => <div data-testid="detail-skeleton" />,
}));
jest.mock("@/components/recipe/Header", () => (props: any) => (
  <div data-testid="recipe-header">{props.title || "header"}</div>
));
jest.mock("@/components/recipe/StepBlock", () => (props: any) => (
  <div data-testid="step-block">{props.section || "step"}</div>
));
jest.mock("@/components/recipe/Sidebar", () => (props: any) => (
  <div data-testid="recipe-sidebar">{props.ingredients?.length ?? 0}</div>
));

// 2) Imports **reales**
import React from "react";
import { render, screen, act } from "@testing-library/react";
import RecipeDetailPage from "@/app/(application)/(generator)/recipe/[id]/page";
import { getRecipeById } from "@/services/recipe.service";
import { useRouter } from "next/navigation";

// 3) Castings para Jest + TS
const mockedGet = getRecipeById as jest.MockedFunction<typeof getRecipeById>;
const mockedRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe("RecipeDetailPage", () => {
  const fakePush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // mock del router
    mockedRouter.mockReturnValue({ push: fakePush } as any);
  });

  it("muestra skeleton mientras carga", async () => {
    // una promesa que nunca resuelve
    mockedGet.mockReturnValue(new Promise(() => {}) as any);

    await act(async () => {
      render(
        // casteamos params a any para evitar el error TS2353
        <RecipeDetailPage params={{ id: "123" } as any} />
      );
    });

    expect(screen.getByTestId("detail-skeleton")).toBeInTheDocument();
  });

  it("muestra mensaje de error cuando no encuentra receta", async () => {
    // Si la función se declara Promise<RecipeDetail|undefined>,
    // devolvemos undefined en vez de null
    mockedGet.mockResolvedValueOnce(undefined as any);

    await act(async () => {
      render(<RecipeDetailPage params={{ id: "456" } as any} />);
    });

    // Ahora esperamos el mensaje de error
    expect(
      await screen.findByText("Receta no encontrada")
    ).toBeInTheDocument();
  });

  it("renderiza correctamente la receta cuando la obtiene", async () => {
    const fakeRecipe = {
      id: "789",
      title: "Mi Receta",
      stepBlocks: [
        { section: "Paso a paso", content: "Paso 1" },
        { section: "Extras", content: "Dato extra" },
      ],
      ingredients: ["a", "b"],
      missingIngredients: ["c"],
    };

    mockedGet.mockResolvedValueOnce(fakeRecipe as any);

    await act(async () => {
      render(<RecipeDetailPage params={{ id: "789" } as any} />);
    });

    // comprueba los mocks
    expect(screen.getByTestId("background-layers")).toBeInTheDocument();
    expect(screen.getByTestId("container-shadow")).toBeInTheDocument();
    expect(screen.getByTestId("recipe-header")).toHaveTextContent("Mi Receta");

    const steps = screen.getAllByTestId("step-block");
    expect(steps).toHaveLength(2);

    expect(screen.getByTestId("recipe-sidebar")).toHaveTextContent("2");
  });
});
