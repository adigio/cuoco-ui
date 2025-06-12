// src/test/core/__tests__/components/RecipeGeneratorPage.test.tsx

import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import RecipeGeneratorPage from "@/app/(application)/(generator)/recipe-generator/page";
import { useRouter } from "next/navigation";
import * as ingredientsStoreModule from "@/store/useIngredientsStore";
import * as authStoreModule from "@/store/useAuthStore";
import * as visionService from "@/services/vision.service";

// ——— Stub ImageUploader para evitar LocalImage useEffect ———
jest.mock(
  "@/components/recipe-generator/ImageUploader",
  () => ({
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
  })
);

// ——— Mocks de módulos centrales ———
jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));
jest.mock("@/store/useIngredientsStore");
jest.mock("@/store/useAuthStore");
jest.mock("@/services/vision.service");

import { useIngredientsStore } from "@/store/useIngredientsStore";
import { useAuthStore }        from "@/store/useAuthStore";

const mockedUseIngredientsStore = useIngredientsStore as jest.Mock;
const mockedUseAuthStore        = useAuthStore        as jest.Mock;
const mockedUseRouter           = useRouter           as jest.MockedFunction<typeof useRouter>;
const mockedAnalyzeImages       = visionService.analyzeImagesWithAPI as jest.MockedFunction<
  typeof visionService.analyzeImagesWithAPI
>;

describe("RecipeGeneratorPage", () => {
  const pushMock = jest.fn();

  beforeAll(() => {
    // silenciar errores en consola
    jest.spyOn(console, "error").mockImplementation(() => {});
    // stub URL.createObjectURL por si se cuela LocalImage
    global.URL.createObjectURL = jest.fn().mockReturnValue("blob:fake");
    global.URL.revokeObjectURL  = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();

    // mock del router
    mockedUseRouter.mockReturnValue({ push: pushMock } as any);

    // mock base de useIngredientsStore
    mockedUseIngredientsStore.mockImplementation((selector?: any) => {
      const storeStub = {
        ingredients: [],
        addIngredient: jest.fn(),
        addMultipleIngredients: jest.fn().mockReturnValue(1),
        removeIngredient: jest.fn(),
        mode: "basic",
      };
      // si me pasan selector, lo ejecuto; si no, devuelvo todo el store
      return typeof selector === "function" ? selector(storeStub) : storeStub;
    });

    // mock base de useAuthStore
    mockedUseAuthStore.mockImplementation((selector?: any) => {
      const authStub = { user: { premium: true }, isAuthenticated: true };
      return typeof selector === "function" ? selector(authStub) : authStub;
    });
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
    // Stub con ingredientes ya cargados
    const storeWithIng = {
      ingredients: ["lechuga"],
      addIngredient: jest.fn(),
      addMultipleIngredients: jest.fn(),
      removeIngredient: jest.fn(),
      mode: "basic",
    };

    // Reemplazo la implementación PARA ESTE CASO concreto:
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

  it("activa suscripción si es free y sube >2 imágenes", async () => {
    // Stub de auth no-premium
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
