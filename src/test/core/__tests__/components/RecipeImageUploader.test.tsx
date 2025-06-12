// src/test/core/__tests__/components/RecipeGeneratorPage.test.tsx

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RecipeGeneratorPage from "@/app/(application)/(generator)/recipe-generator/page";
import { useRouter } from "next/navigation";
import * as ingredientsStoreModule from "@/store/useIngredientsStore";
import * as authStoreModule from "@/store/useAuthStore";
import * as visionService from "@/services/vision.service";

// Stub ImageUploader to avoid LocalImage effects
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

// Mocks básicos
jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));
jest.mock("@/store/useIngredientsStore");
jest.mock("@/store/useAuthStore");
jest.mock("@/services/vision.service");

describe("RecipeGeneratorPage", () => {
  const pushMock = jest.fn();
  const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
  const mockedAnalyzeImages =
    visionService.analyzeImagesWithAPI as jest.MockedFunction<
      typeof visionService.analyzeImagesWithAPI
    >;

  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    // Stub URL.createObjectURL in case any LocalImage is still used
    global.URL.createObjectURL = jest.fn().mockReturnValue("blob:fake");
    global.URL.revokeObjectURL = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    // Router stub
    mockedUseRouter.mockReturnValue({ push: pushMock } as any);

    // Ingredients store stub: no images, no ingredients, addMultiple returns 1
    jest
      .spyOn(ingredientsStoreModule, "useIngredientsStore")
      .mockImplementation((selector?: any) => {
        const storeStub = {
          ingredients: [],
          addIngredient: jest.fn(),
          addMultipleIngredients: jest.fn().mockReturnValue(1),
          removeIngredient: jest.fn(),
          mode: "basic",
        };
        // Si recibimos una función, la ejecutamos, si no, devolvemos todo el store
        return typeof selector === "function" ? selector(storeStub) : storeStub;
      });

    // Auth store stub: user premium by default
    jest
      .spyOn(authStoreModule, "useAuthStore")
      .mockImplementation((selector) =>
        selector({ user: { premium: true }, isAuthenticated: true } as any)
      );
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("renderiza título y botón Continuar", () => {
    render(<RecipeGeneratorPage />);
    expect(
      screen.getByText(/Subí una foto de tu heladera o alacena/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Continuar/i })
    ).toBeInTheDocument();
  });

  it("abre AlertModal si no hay imágenes ni ingredientes", async () => {
    render(<RecipeGeneratorPage />);
    fireEvent.click(screen.getByRole("button", { name: /Continuar/i }));
    expect(
      await screen.findByText(
        /Debes agregar al menos una imagen o un ingrediente para continuar/i
      )
    ).toBeInTheDocument();
  });

  it("redirige directamente si ya hay ingredientes", async () => {
    // Ahora stubear ingredientes previos
    jest
      .spyOn(ingredientsStoreModule, "useIngredientsStore")
      .mockImplementation((selector?: any) => {
        const storeWithIng = {
          ingredients: ["lechuga"],
          addIngredient: jest.fn(),
          addMultipleIngredients: jest.fn(),
          removeIngredient: jest.fn(),
          mode: "basic",
        };
        return typeof selector === "function"
          ? selector(storeWithIng)
          : storeWithIng;
      });

    render(<RecipeGeneratorPage />);
    fireEvent.click(screen.getByRole("button", { name: /Continuar/i }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/review");
    });
    expect(mockedAnalyzeImages).not.toHaveBeenCalled();
  });

  it("activa suscripción y no llama al servicio si es free y sube >2 imágenes", async () => {
    // Stubear non-premium
    jest
      .spyOn(authStoreModule, "useAuthStore")
      .mockImplementation((selector) =>
        selector({ user: { premium: false }, isAuthenticated: true } as any)
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

  it("procesa imágenes y redirige si detecta ingredientes", async () => {
    const fakeResult = [{ name: "pepino", origin: "image", confirm: true }];
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
