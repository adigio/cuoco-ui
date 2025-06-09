// 1) Mockeamos next/navigation y nuestro hook ANTES de cualquier import real
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@/store/useIngredientsStore", () => ({
  useIngredientsStore: jest.fn(),
}));

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ReviewPage from "@/app/(application)/(generator)/review/page";
import { useRouter } from "next/navigation";
import { useIngredientsStore } from "@/store/useIngredientsStore";

// 2) Mock de los modales
jest.mock("@/components/shared/modal/AlertModal", () => (props: any) =>
  props.show ? <div data-testid="alert-modal">{props.children}</div> : null
);
jest.mock("@/components/shared/modal/ConfirmationModal", () => (props: any) =>
  props.isOpen ? (
    <div data-testid="confirm-modal">
      <button onClick={props.onConfirm}>OK</button>
      <button onClick={props.onCancel}>Cancel</button>
      {props.children}
    </div>
  ) : null
);

describe("ReviewPage", () => {
  const pushMock = jest.fn();
  const mockedUseRouter = useRouter as jest.Mock;
  const mockedUseIngredients = useIngredientsStore as jest.Mock;

  const defaultStore = {
    ingredients: [
      { name: "tomate", origin: "manual", confirm: false },
      { name: "cebolla", origin: "imagen", confirm: false },
    ],
    confirmIngredient: jest.fn(),
    updateIngredient: jest.fn(),
    removeIngredient: jest.fn(),
    mode: "basic",
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // 3) Configuramos useRouter
    mockedUseRouter.mockReturnValue({ push: pushMock });

    // 4) Configuramos useIngredientsStore con el defaultStore
    mockedUseIngredients.mockImplementation((selector?: any) =>
      typeof selector === "function" ? selector(defaultStore) : defaultStore
    );
  });

  it("redirige a /recipe-generator si no hay ingredientes", () => {
    // Override para ingredientes vacíos
    mockedUseIngredients.mockImplementation(() => ({ ...defaultStore, ingredients: [] }));

    render(<ReviewPage />);
    expect(pushMock).toHaveBeenCalledWith("/recipe-generator");
  });

  it("muestra la lista de ingredientes y botones", () => {
    render(<ReviewPage />);
    expect(screen.getByText("Revisión de Ingredientes")).toBeInTheDocument();
    expect(screen.getByText("tomate")).toBeInTheDocument();
    expect(screen.getByText("cebolla")).toBeInTheDocument();
    const confirmBtns = screen.getAllByRole("button", { name: /Confirmar|Confirmado/ });
    expect(confirmBtns).toHaveLength(2);
  });

  it("al confirmar un ingrediente llama a confirmIngredient", () => {
    render(<ReviewPage />);
    fireEvent.click(screen.getAllByRole("button", { name: "Confirmar" })[0]);
    expect(defaultStore.confirmIngredient).toHaveBeenCalledWith(0);
  });

 it("al editar abre el modal, cambia nombre y cierra", async () => {
  render(<ReviewPage />);
  // abrimos el modal para el segundo ingrediente
  fireEvent.click(screen.getAllByRole("button", { name: "Editar" })[1]);

  // en lugar de getByRole("textbox"), buscamos el input que tenía valor "cebolla"
  const input = screen.getByDisplayValue("cebolla");
  fireEvent.change(input, { target: { value: "papa" } });

  // click en Guardar dentro del modal
  fireEvent.click(screen.getByRole("button", { name: "Guardar" }));

  await waitFor(() => {
    expect(defaultStore.updateIngredient).toHaveBeenCalledWith(1, { name: "papa" });
  });
});


  it("al eliminar abre confirm modal y llama a removeIngredient", async () => {
    render(<ReviewPage />);
    fireEvent.click(screen.getAllByRole("button", { name: "Eliminar" })[0]);
    expect(screen.getByTestId("confirm-modal")).toBeInTheDocument();
    fireEvent.click(screen.getByText("OK"));
    await waitFor(() => {
      expect(defaultStore.removeIngredient).toHaveBeenCalledWith(0);
    });
  });

  it("sin confirmados al ir a filtros muestra AlertModal", () => {
    render(<ReviewPage />);
    fireEvent.click(screen.getByRole("button", { name: "Ir a filtros" }));
    expect(screen.getByTestId("alert-modal")).toBeInTheDocument();
  });

  it("con al menos uno confirmado redirige al path según mode", () => {
    // Override para un confirmado
    const storeConfirmed = {
      ...defaultStore,
      ingredients: [{ ...defaultStore.ingredients[0], confirm: true }],
    };
    mockedUseIngredients.mockImplementation((sel?: any) =>
      typeof sel === "function" ? sel(storeConfirmed) : storeConfirmed
    );

    render(<ReviewPage />);
    fireEvent.click(screen.getByRole("button", { name: "Ir a filtros" }));
    expect(pushMock).toHaveBeenCalledWith("/filters");
  });

  it("mode meal-prep redirige a /meal-prep-filters cuando hay confirmados", () => {
    const storeMeal = {
      ...defaultStore,
      ingredients: [{ ...defaultStore.ingredients[0], confirm: true }],
      mode: "meal-prep",
    };
    mockedUseIngredients.mockImplementation((sel?: any) =>
      typeof sel === "function" ? sel(storeMeal) : storeMeal
    );

    render(<ReviewPage />);
    fireEvent.click(screen.getByRole("button", { name: "Ir a filtros" }));
    expect(pushMock).toHaveBeenCalledWith("/meal-prep-filters");
  });
});
