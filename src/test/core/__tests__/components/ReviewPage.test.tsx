import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ReviewPage from "@/app/(application)/(generator)/review/page";
import * as ingredientsStoreModule from "@/store/useIngredientsStore";

// Creamos el mock de push
const pushMock = jest.fn();

// Mock de next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
  usePathname: () => "/review",
}));

// Mock del store
jest.mock("@/store/useIngredientsStore");

// Mock modales
jest.mock("@/components/shared/modal/AlertModal", () => (props: any) =>
  props.show ? <div data-testid="alert-modal">{props.children}</div> : null
);

jest.mock("@/components/shared/modal/ConfirmationModal", () => (props: any) =>
  props.isOpen ? (
    <div data-testid="confirm-modal">
      <button onClick={props.onConfirm}>OK</button>
      <button onClick={props.onCancel}>Cancel</button>
    </div>
  ) : null
);

describe("ReviewPage", () => {
  const mockedUseIngredients = jest.mocked(ingredientsStoreModule.useIngredientsStore);

  const baseStore = {
    ingredients: [
      { name: "tomate", origin: "manual", confirmed: false, quantity: 0, unit: "" },
      { name: "cebolla", origin: "imagen", confirmed: false, quantity: 0, unit: "" },
    ],
    confirmIngredient: jest.fn(),
    updateIngredient: jest.fn(),
    removeIngredient: jest.fn(),
    clearIngredientsIfNeeded: jest.fn(),
    startGeneratorSession: jest.fn(),
    mode: "basic",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithStore = (store: typeof baseStore) => {
    mockedUseIngredients.mockReturnValue(store);
    render(<ReviewPage />);
  };

  it("redirige a /recipe-generator si no hay ingredientes", () => {
    const store = { ...baseStore, ingredients: [] };
    renderWithStore(store);
    expect(pushMock).toHaveBeenCalledWith("/recipe-generator");
  });

  it("muestra la lista de ingredientes y botones", () => {
    renderWithStore(baseStore);
    expect(screen.getByText("Revisión de Ingredientes")).toBeInTheDocument();
    expect(screen.getByText("tomate")).toBeInTheDocument();
    expect(screen.getByText("cebolla")).toBeInTheDocument();
  });

  it("al confirmar un ingrediente llama a confirmIngredient", () => {
    renderWithStore(baseStore);
    fireEvent.click(screen.getAllByRole("button", { name: /Confirmar/i })[0]);
    expect(baseStore.confirmIngredient).toHaveBeenCalledWith(0);
  });

  it("al editar abre modal y actualiza el nombre", async () => {
    renderWithStore(baseStore);
    fireEvent.click(screen.getAllByRole("button", { name: /Editar/i })[1]);
    const input = screen.getByDisplayValue("cebolla");
    fireEvent.change(input, { target: { value: "papa" } });
    fireEvent.click(screen.getByRole("button", { name: /Guardar/i }));
    await waitFor(() => {
      expect(baseStore.updateIngredient).toHaveBeenCalledWith(1, {
        name: "papa",
        quantity: 0,
        unit: "",
      });
    });
  });

  it("al eliminar muestra confirm modal y elimina", async () => {
    renderWithStore(baseStore);
    fireEvent.click(screen.getAllByRole("button", { name: /Eliminar/i })[0]);
    expect(screen.getByTestId("confirm-modal")).toBeInTheDocument();
    fireEvent.click(screen.getByText("OK"));
    await waitFor(() => {
      expect(baseStore.removeIngredient).toHaveBeenCalledWith(0);
    });
  });

  it("muestra alert modal al ir a filtros sin confirmados", () => {
    renderWithStore(baseStore);
    fireEvent.click(screen.getByRole("button", { name: /Ir a filtros/i }));
    expect(screen.getByTestId("alert-modal")).toBeInTheDocument();
  });

  it("redirige a /filters al tener confirmados", () => {
    const store = {
      ...baseStore,
      ingredients: [
        { name: "tomate", origin: "manual", confirmed: true, quantity: 0, unit: "" },
      ],
    };
    renderWithStore(store);
    fireEvent.click(screen.getByRole("button", { name: /Ir a filtros/i }));
    expect(pushMock).toHaveBeenCalledWith("/filters");
  });

 it("redirige a /meal-prep-filters si mode es meal-prep", () => {
  const store = {
    ...baseStore,
    ingredients: [
      { name: "tomate", origin: "manual", confirmed: true, quantity: 0, unit: "" },
    ],
    mode: "meal-prep",
  };
  renderWithStore(store);
  fireEvent.click(screen.getByRole("button", { name: /Ir a filtros/i }));
  expect(pushMock).toHaveBeenCalledWith("/meal-prep-filters");
});

});
