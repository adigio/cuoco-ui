// src/__tests__/FiltrosPage.test.tsx

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@/components/shared/BackgroundLayers", () => () => (
  <div data-testid="background-layers" />
));
jest.mock("@/components/shared/containers/ContainerShadow", () => (props: any) => (
  <div data-testid="container-shadow">{props.children}</div>
));
jest.mock("@/components/recipe-generator/RecipeFilters", () => () => (
  <div data-testid="recipe-filters" />
));

import React from "react";
import { render, screen, within } from "@testing-library/react";
import FiltrosPage from "@/app/(application)/(generator)/filters/page";

describe("FiltrosPage", () => {
  it("renderiza BackgroundLayers, la línea divisoria y RecipeFilters dentro de ContainerShadow", () => {
    // al desestructurar obtengo container para consultas basadas en clase
    const { container } = render(<FiltrosPage />);

    // 1) BackgroundLayers
    expect(screen.getByTestId("background-layers")).toBeInTheDocument();

    // 2) División: buscamos el <div> con la clase `border-b-4`
    const divider = container.querySelector("div.border-b-4");
    expect(divider).toBeInTheDocument();

    // 3) ContainerShadow
    const containerShadow = screen.getByTestId("container-shadow");
    expect(containerShadow).toBeInTheDocument();

    // 4) RecipeFilters dentro de ese ContainerShadow
    expect(within(containerShadow).getByTestId("recipe-filters")).toBeInTheDocument();
  });
});
