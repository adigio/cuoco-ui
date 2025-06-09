// src/test/core/__tests__/components/RecipeDetailPage.test.tsx

// 0) Mock de react.use para que use(params) simplemente devuelva params
jest.mock("react", () => {
  const ActualReact = jest.requireActual("react");
  return {
    ...ActualReact,
    use: (v: any) => v,
  };
});

// 1) Mocks de next/navigation y servicios
jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));
jest.mock("@/services/recipe.service");

// 2) Mocks de componentes hijos con displayName
jest.mock("@/components/shared/BackgroundLayers", () => {
  const React = require("react");
  function BackgroundLayers() {
    return <div data-testid="background-layers" />;
  }
  BackgroundLayers.displayName = "BackgroundLayers";
  return BackgroundLayers;
});
jest.mock("@/components/shared/containers/ContainerShadow", () => {
  const React = require("react");
  function ContainerShadow(props: any) {
    return <div data-testid="container-shadow">{props.children}</div>;
  }
  ContainerShadow.displayName = "ContainerShadow";
  return ContainerShadow;
});
jest.mock("@/components/shared/skeleton/RecipeDetailSkeleton", () => {
  const React = require("react");
  function RecipeDetailSkeleton() {
    return <div data-testid="detail-skeleton" />;
  }
  RecipeDetailSkeleton.displayName = "RecipeDetailSkeleton";
  return { RecipeDetailSkeleton };
});
jest.mock("@/components/recipe/Header", () => {
  const React = require("react");
  function Header(props: any) {
    return <div data-testid="recipe-header">{props.title || "header"}</div>;
  }
  Header.displayName = "RecipeHeader";
  return Header;
});
jest.mock("@/components/recipe/StepBlock", () => {
  const React = require("react");
  function StepBlock(props: any) {
    return <div data-testid="step-block">{props.section || "step"}</div>;
  }
  StepBlock.displayName = "StepBlock";
  return StepBlock;
});
jest.mock("@/components/recipe/Sidebar", () => {
  const React = require("react");
  function Sidebar(props: any) {
    return (
      <div data-testid="recipe-sidebar">
        {props.ingredients?.length ?? 0}
      </div>
    );
  }
  Sidebar.displayName = "RecipeSidebar";
  return Sidebar;
});

// 3) Imports reales
import React from "react";
import { render, screen, act } from "@testing-library/react";
import RecipeDetailPage from "@/app/(application)/(generator)/recipe/[id]/page";
import * as recipeServiceModule from "@/services/recipe.service";
import { useRouter } from "next/navigation";

// 4) Tipado de mocks con jest.mocked
const mockedGet = jest.mocked(recipeServiceModule.getRecipeById);
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
    // devolvemos undefined para simular “no encontrada”
    mockedGet.mockResolvedValueOnce(undefined as any);

    await act(async () => {
      render(<RecipeDetailPage params={{ id: "456" } as any} />);
    });

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

    // Verificamos que los mocks se hayan renderizado
    expect(screen.getByTestId("background-layers")).toBeInTheDocument();
    expect(screen.getByTestId("container-shadow")).toBeInTheDocument();
    expect(screen.getByTestId("recipe-header")).toHaveTextContent("Mi Receta");

    const steps = screen.getAllByTestId("step-block");
    expect(steps).toHaveLength(2);

    expect(screen.getByTestId("recipe-sidebar")).toHaveTextContent("2");
  });
});
