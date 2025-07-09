// src/test/core/__tests__/components/RecipeGeneratorPage.test.tsx

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RecipeGeneratorPage from "@/app/(application)/(generator)/recipe-generator/page";
import { useRouter } from "next/navigation";
import { useIngredientsStore } from "@/store/useIngredientsStore";
import { useAuthStore } from "@/store/useAuthStore";
import * as visionService from "@/services/vision.service";

// ——— Stub ImageUploader para evitar LocalImage useEffect ———
jest.mock("@/components/recipe-generator/ImageUploader", () => ({
  __esModule: true,
  default: (props: any) => (
    <input
      data-testid="file-input"
      type="file"
      multiple
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        props.setImages(files);
      }}
    />
  ),
}));

// ——— Mocks de módulos centrales ———
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn().mockReturnValue("/recipe-generator"),
}));

jest.mock("@/store/useIngredientsStore");
jest.mock("@/store/useAuthStore");
jest.mock("@/services/vision.service");

// Tipado correcto de mocks
const mockedUseIngredientsStore = jest.mocked(useIngredientsStore);
const mockedUseAuthStore = jest.mocked(useAuthStore);
const mockedUseRouter = jest.mocked(useRouter);
const mockedAnalyzeImages = jest.mocked(visionService.analyzeImagesWithAPI);

describe("Página RecipeGeneratorPage (/recipe-generator)", () => {
  const pushMock = jest.fn();

  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    global.URL.createObjectURL = jest.fn().mockReturnValue("blob:fake");
    global.URL.revokeObjectURL = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseRouter.mockReturnValue({ push: pushMock } as any);

    mockedUseIngredientsStore.mockImplementation((selector?: any) => {
      const storeStub = {
        ingredients: [],
        addIngredient: jest.fn(),
        addMultipleIngredients: jest.fn().mockReturnValue(1),
        removeIngredient: jest.fn(),
        clearIngredientsIfNeeded: jest.fn(),
        startGeneratorSession: jest.fn(),
        mode: "basic",
      };
      return typeof selector === "function" ? selector(storeStub) : storeStub;
    });

    mockedUseAuthStore.mockImplementation((selector?: any) => {
      const authStub = { user: { premium: true }, isAuthenticated: true };
      return typeof selector === "function" ? selector(authStub) : authStub;
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("debe renderizar el título principal y el botón 'Continuar'", () => {
    render(<RecipeGeneratorPage />);
    expect(
      screen.getByText(/Subí una foto de tu heladera o alacena/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Continuar/i })
    ).toBeInTheDocument();
  });

  it("debe mostrar una alerta si no hay imágenes ni ingredientes al hacer clic en 'Continuar'", async () => {
    render(<RecipeGeneratorPage />);
    fireEvent.click(screen.getByRole("button", { name: /Continuar/i }));

    expect(
      await screen.findByText(
        /Debes agregar al menos una imagen o un ingrediente para continuar/i
      )
    ).toBeInTheDocument();
  });

  it("debe redirigir automáticamente a '/review' si ya hay ingredientes en el store", async () => {
    const storeWithIng = {
      ingredients: ["lechuga"],
      addIngredient: jest.fn(),
      addMultipleIngredients: jest.fn(),
      removeIngredient: jest.fn(),
      clearIngredientsIfNeeded: jest.fn(),
      startGeneratorSession: jest.fn(),
      mode: "basic",
    };

    mockedUseIngredientsStore.mockImplementation((selector?: any) =>
      typeof selector === "function" ? selector(storeWithIng) : storeWithIng
    );

    render(<RecipeGeneratorPage />);
    fireEvent.click(screen.getByRole("button", { name: /Continuar/i }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/review");
    });
    expect(mockedAnalyzeImages).not.toHaveBeenCalled();
  });

  it("debe mostrar la ventana de suscripción si el usuario es free y sube más de 2 imágenes", async () => {
    const authFree = { user: { premium: false }, isAuthenticated: true };
    mockedUseAuthStore.mockImplementation((selector?: any) =>
      typeof selector === "function" ? selector(authFree) : authFree
    );

    render(<RecipeGeneratorPage />);
    const input = screen.getByTestId("file-input");
    const files = [
      new File([], "1.png"),
      new File([], "2.png"),
      new File([], "3.png"),
    ];
    fireEvent.change(input, { target: { files } });
    fireEvent.click(screen.getByRole("button", { name: /Continuar/i }));

    expect(pushMock).not.toHaveBeenCalled();
    expect(mockedAnalyzeImages).not.toHaveBeenCalled();
    expect(await screen.findByText(/Contratar/i)).toBeInTheDocument();
  });

  it("debe analizar imágenes y redirigir a '/review' si se detectan ingredientes válidos", async () => {
    const fakeResult = [
      {
        name: "pepino",
        origin: "image",
        confirm: true,
        quantity: 1,
        unit: "unidad",
        optional: false,
        source: "mock",
        confirmed: true,
      },
    ];
    mockedAnalyzeImages.mockResolvedValueOnce(fakeResult);

    render(<RecipeGeneratorPage />);
    const input = screen.getByTestId("file-input");
    const file = new File([""], "foto.png", { type: "image/png" });
    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(screen.getByRole("button", { name: /Continuar/i }));

    await waitFor(() => {
      expect(mockedAnalyzeImages).toHaveBeenCalledWith([file]);
      expect(pushMock).toHaveBeenCalledWith("/review");
    });
  });
});

