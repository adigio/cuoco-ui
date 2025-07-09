import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RecipeGeneratorPage from "@/app/(application)/(generator)/recipe-generator/page";
import { useRouter, usePathname } from "next/navigation";
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
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn().mockReturnValue("/recipe-generator"),
}));
jest.mock("@/store/useIngredientsStore");
jest.mock("@/store/useAuthStore");
jest.mock("@/services/vision.service");

describe("Página RecipeGeneratorPage (/recipe-generator)", () => {
  const pushMock = jest.fn();
  const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
  const mockedAnalyzeImages = visionService.analyzeImagesWithAPI as jest.MockedFunction<typeof visionService.analyzeImagesWithAPI>;

  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    global.URL.createObjectURL = jest.fn().mockReturnValue("blob:fake");
    global.URL.revokeObjectURL = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseRouter.mockReturnValue({ push: pushMock } as any);

    jest.spyOn(ingredientsStoreModule, "useIngredientsStore").mockImplementation((selector?: any) => {
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

    jest.spyOn(authStoreModule, "useAuthStore").mockImplementation((selector) =>
      selector({ user: { premium: true }, isAuthenticated: true } as any)
    );
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("debe mostrar el título principal y el botón 'Continuar'", () => {
    render(<RecipeGeneratorPage />);
    expect(screen.getByText(/Subí una foto de tu heladera o alacena/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Continuar/i })).toBeInTheDocument();
  });

  it("debe mostrar el modal de alerta si el usuario hace clic en 'Continuar' sin subir imágenes ni agregar ingredientes", async () => {
    render(<RecipeGeneratorPage />);
    fireEvent.click(screen.getByRole("button", { name: /Continuar/i }));
    expect(await screen.findByText(/Debes agregar al menos una imagen o un ingrediente para continuar/i)).toBeInTheDocument();
  });

  it("debe redirigir directamente a /review si ya hay ingredientes cargados en el store", async () => {
    jest.spyOn(ingredientsStoreModule, "useIngredientsStore").mockImplementation((selector?: any) => {
      const storeWithIngredients = {
        ingredients: ["lechuga"],
        addIngredient: jest.fn(),
        addMultipleIngredients: jest.fn(),
        removeIngredient: jest.fn(),
        clearIngredientsIfNeeded: jest.fn(),
        startGeneratorSession: jest.fn(),
        mode: "basic",
      };
      return typeof selector === "function" ? selector(storeWithIngredients) : storeWithIngredients;
    });

    render(<RecipeGeneratorPage />);
    fireEvent.click(screen.getByRole("button", { name: /Continuar/i }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/review");
    });

    expect(mockedAnalyzeImages).not.toHaveBeenCalled();
  });

  it("debe mostrar el modal de suscripción si el usuario no es premium y sube más de 2 imágenes", async () => {
    jest.spyOn(authStoreModule, "useAuthStore").mockImplementation((selector) =>
      selector({ user: { premium: false }, isAuthenticated: true } as any)
    );

    render(<RecipeGeneratorPage />);
    const input = screen.getByTestId("file-input");

    const files = [new File([], "1.png"), new File([], "2.png"), new File([], "3.png")];
    fireEvent.change(input, { target: { files } });

    fireEvent.click(screen.getByRole("button", { name: /Continuar/i }));

    expect(pushMock).not.toHaveBeenCalled();
    expect(mockedAnalyzeImages).not.toHaveBeenCalled();
    expect(await screen.findByText(/Contratar/i)).toBeInTheDocument();
  });

  it("debe analizar imágenes y redirigir a /review si detecta ingredientes", async () => {
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
