import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RecipeGeneratorPage from "@/app/(application)/(generator)/recipe-generator/page";
import { useRouter } from "next/navigation";
import { useIngredientsStore } from "@/store/useIngredientsStore";
import { useAuthStore } from "@/store/useAuthStore";
import * as visionService from "@/services/vision.service";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// Mocks
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));
jest.mock("@/store/useIngredientsStore");
jest.mock("@/store/useAuthStore");
jest.mock("@/services/vision.service");

describe("RecipeGeneratorPage", () => {
    const pushMock = jest.fn();

    // ⬇️ Cast explícito
    const mockedUseRouter = useRouter as unknown as jest.Mock<
        Partial<AppRouterInstance>
    >;

    const mockedUseAuthStore = useAuthStore as jest.MockedFunction<
        typeof useAuthStore
    >;
    const mockedUseIngredientsStore = useIngredientsStore as jest.MockedFunction<
        typeof useIngredientsStore
    >;
    const mockedAnalyzeImagesWithAPI =
        visionService.analyzeImagesWithAPI as jest.MockedFunction<
            typeof visionService.analyzeImagesWithAPI
        >;

    beforeEach(() => {
        mockedUseRouter.mockReturnValue({
            push: pushMock,
            back: jest.fn(),
            forward: jest.fn(),
            refresh: jest.fn(),
            replace: jest.fn(),
            prefetch: jest.fn(),
        });

        mockedUseIngredientsStore.mockReturnValue({
            ingredients: [],
            addIngredient: jest.fn(),
            addMultipleIngredients: jest.fn(() => 1),
            mode: "basic",
        });

        mockedUseAuthStore.mockImplementation((selector) =>
            selector({
                user: {
                    name: 'Mock User',
                    email: 'mock@example.com',
                    premium: true,
                },
                isAuthenticated: true,
                login: jest.fn(),
                logout: jest.fn(),
                updateUser: jest.fn(),
            })
        );


        afterEach(() => {
            jest.clearAllMocks();
        });

        it("renderiza el componente con el título y botón", () => {
            render(<RecipeGeneratorPage />);
            expect(screen.getByText(/Subí una foto/i)).toBeInTheDocument();
            expect(
                screen.getByRole("button", { name: /Continuar/i })
            ).toBeInTheDocument();
        });

        it("muestra el modal de alerta si no hay imágenes ni ingredientes", async () => {
            render(<RecipeGeneratorPage />);
            fireEvent.click(screen.getByRole("button", { name: /Continuar/i }));
            expect(
                await screen.findByText(/Debes agregar al menos una/i)
            ).toBeInTheDocument();
        });

        it("muestra el modal de suscripción si no es premium y sube más de 2 imágenes", async () => {
            mockedUseAuthStore.mockImplementation((selector) =>
                selector({
                    user: {
                        name: "Mock User",
                        email: "mock@example.com",
                        premium: false,
                    },
                    isAuthenticated: true,
                    login: jest.fn(),
                    logout: jest.fn(),
                    updateUser: jest.fn(),
                })
            );

            render(<RecipeGeneratorPage />);
            const input = screen.getByRole("button", { name: /Continuar/i });

            fireEvent.click(input);
            await waitFor(() => {
                expect(screen.getByText(/falta/i)).toBeInTheDocument(); // o ajustá el texto si cambia
            });
        });

        it("llama a analyzeImagesWithAPI y redirige si todo es correcto", async () => {
            mockedAnalyzeImagesWithAPI.mockResolvedValue([
                { name: 'tomate', origin: 'image', confirm: true },
                { name: 'pan', origin: 'image', confirm: true },
            ]);

            render(<RecipeGeneratorPage />);
            fireEvent.click(screen.getByRole("button", { name: /Continuar/i }));

            await waitFor(() => {
                expect(mockedAnalyzeImagesWithAPI).toHaveBeenCalled();
                expect(pushMock).toHaveBeenCalledWith("/review");
            });
        });

        it("muestra error si no se detectan ingredientes", async () => {
            mockedAnalyzeImagesWithAPI.mockResolvedValue([]);

            render(<RecipeGeneratorPage />);
            fireEvent.click(screen.getByRole("button", { name: /Continuar/i }));

            await waitFor(() => {
                expect(
                    screen.getByText(/No se detectaron ingredientes/i)
                ).toBeInTheDocument();
            });
        });
    });
})
