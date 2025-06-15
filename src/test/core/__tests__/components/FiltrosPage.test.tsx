// src/__tests__/FiltrosPage.test.tsx

// 1) Mock de next/navigation (no es componente, así que está bien como está)
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// 2) Mocks de componentes con displayName para evitar el warning react/display-name
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

jest.mock("@/components/recipe-generator/RecipeFilters", () => {
  const React = require("react");
  function RecipeFilters() {
    return <div data-testid="recipe-filters" />;
  }
  RecipeFilters.displayName = "RecipeFilters";
  return RecipeFilters;
});

// 3) Imports reales
import React from "react";
import { render, screen, within } from "@testing-library/react";
import FiltrosPage from "@/app/(application)/(generator)/filters/page";

describe("FiltrosPage", () => {
  it("renderiza BackgroundLayers, la línea divisoria y RecipeFilters dentro de ContainerShadow", () => {
    const { container } = render(<FiltrosPage />);

    // 1) BackgroundLayers
    expect(screen.getByTestId("background-layers")).toBeInTheDocument();

    // 2) División: buscamos el <div> con la clase `border-b-4`
    const divider = container.querySelector("div.border-b-4");
    expect(divider).toBeInTheDocument();

    // 3) ContainerShadow
    const containerShadow = screen.getByTestId("container-shadow");
    expect(containerShadow).toBeInTheDocument();

    // 4) RecipeFilters dentro de ContainerShadow
    expect(within(containerShadow).getByTestId("recipe-filters")).toBeInTheDocument();
  });
});
