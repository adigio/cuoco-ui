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
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn().mockReturnValue("/recipe/123"),
}));
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

describe("Componente RecipeDetailPage (/recipe/[id])", () => {
  const fakePush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockedRouter.mockReturnValue({ push: fakePush } as any);
  });

  it("debe mostrar el skeleton de carga mientras se espera la respuesta del servicio", async () => {
    mockedGet.mockReturnValue(new Promise(() => {}) as any); // promesa que nunca resuelve

    await act(async () => {
      render(<RecipeDetailPage params={{ id: "123" } as any} />);
    });

    expect(screen.getByTestId("detail-skeleton")).toBeInTheDocument();
  });

  it("debe mostrar un mensaje de error cuando no se encuentra la receta (respuesta undefined)", async () => {
    mockedGet.mockResolvedValueOnce(undefined as any);

    await act(async () => {
      render(<RecipeDetailPage params={{ id: "456" } as any} />);
    });

    expect(
      await screen.findByText("Receta no encontrada")
    ).toBeInTheDocument();
  });

  it("debe renderizar todos los componentes correctamente cuando la receta es válida", async () => {
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

    expect(screen.getByTestId("background-layers")).toBeInTheDocument();
    expect(screen.getByTestId("container-shadow")).toBeInTheDocument();
    expect(screen.getByTestId("recipe-header")).toHaveTextContent("Mi Receta");

    const steps = screen.getAllByTestId("step-block");
    expect(steps).toHaveLength(2);

    expect(screen.getByTestId("recipe-sidebar")).toHaveTextContent("2");
  });
});
