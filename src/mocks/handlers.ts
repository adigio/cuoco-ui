import { mocksIngredients } from "@/mocks/ingredients";
import { mockDetailsRecipes, mockRecipes } from "@/mocks/recipes";
import { mealPreps } from "@/mocks/mealprep";
import { User } from "@/types/auth/auth.types";
import { http, HttpResponse } from "msw";
import { MealPrepGenerationRequest } from "@/types"; // Asegurate de tener estos tipos

//Define como se responde a las APIs mockeadas

export const handlers = [
  http.post("/api/analyze-images", async ({ request }) => {
    // const body = await request.json();

    console.log("[MSW] Interceptando solicitud a /api/analyze-images");

    return HttpResponse.json(mocksIngredients, { status: 200 });
  }),

  http.post("/api/generate-recipes", async ({ request }) => {
    // const body = await request.json();

    console.log("[MSW] Interceptando solicitud a /api/generate-recipes");

    return HttpResponse.json(mockRecipes, { status: 200 });
  }),
  http.get("/api/recipe/:id", async ({ params }) => {
    console.log("[MSW] Interceptando solicitud a /api/recipe/:id");
    const id = parseInt((params.id as string) || "0", 10) - 1;
    console.log(id);
    return HttpResponse.json(mockDetailsRecipes[id], { status: 200 });
  }),
  http.post("/api/login", async ({ request }) => {
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return HttpResponse.json({ message: "Bad request" }, { status: 400 });
    }

    const { email, password } = body;

    console.log("[MSW] Login:", { email, password });

    if (email === "test@cuoco.com" && password === "123456") {
      return HttpResponse.json({
        user: {
          name: "Usuario Free",
          email,
          token: "fake-jwt-123",
          premium: false,
          preferences: {
            cookingLevel: "Medio",
            diet: "Omnívoro",
            dietaryRestrictions: ["Sin lactosa"],
            allergies: ["Ninguna"],
            favoriteCuisines: []
          }
        },
      });
    }
    if (email === "premium@cuoco.com" && password === "123456") {
      return HttpResponse.json({
        user: {
          name: "Usuario Premium",
          email,
          token: "fake-jwt-123",
          premium: true,
          preferences: {
            cookingLevel: "Alto",
            diet: "Vegetariano",
            dietaryRestrictions: ["Sin gluten"],
            allergies: ["Maní"],
            favoriteCuisines: []
          }
        },
      });
    }

    return HttpResponse.json(
      { message: "Credenciales inválidas" },
      { status: 401 }
    );
  }),
  http.post("/api/reset-password", async ({ request }) => {
    const body = await request.json();

    console.log("[MSW] Interceptando solicitud a /api/reset-password", body);

    // Validación segura
    if (!body || typeof body !== "object" || typeof body.email !== "string") {
      return HttpResponse.json(
        { message: "Falta un email válido" },
        { status: 400 }
      );
    }

    const email = body.email;

    return HttpResponse.json(
      {
        message: `Se envió un correo de recuperación a ${email}`,
      },
      { status: 200 }
    );
  }),
  http.post("/api/register", async ({ request }) => {
    const body = (await request.json()) as {
      email: string;
      password: string;
      level: string;
      diet: string;
      foodNeeds: string[];
      allergies: string[];
    };

    const mockUser: User = {
      name: "Nuevo Usuario",
      email: body.email,
      token: "fake-jwt-register-123",
      premium: true,
      preferences: {
        cookingLevel: body.level as "Bajo" | "Medio" | "Alto",
        diet: body.diet as "Omnívoro" | "Vegetariano" | "Vegano" | "Otro",
        dietaryRestrictions: body.foodNeeds,
        allergies: body.allergies,
        favoriteCuisines: [],
      },
    };

    return HttpResponse.json({ user: mockUser });
  }),

  http.get("/api/profile", async ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return HttpResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    const mockUser: User = {
      name: "Usuario Test",
      email: "test@cuoco.com",
      token: "fake-jwt-123",
      premium: false,
      preferences: {
        cookingLevel: "Medio",
        diet: "Omnívoro",
        dietaryRestrictions: ["Sin lactosa"],
        allergies: ["Ninguna en particular"],
        favoriteCuisines: [],
      },
    };

    return HttpResponse.json({ user: mockUser });
  }),
  http.post("/api/generate-meal-prep", async ({ request }) => {
    const body = (await request.json()) as MealPrepGenerationRequest;

    console.log("[MSW] Interceptando solicitud a /api/generate-meal-prep");

    return HttpResponse.json(mealPreps, { status: 200 });
  }),
  http.get("/api/meal-prep/:id", ({ params }) => {
    const id = Number(params.id);
    const mealPrep = mealPreps.find((m) => m.id === id);

    if (mealPrep) {
      return HttpResponse.json(mealPrep);
    } else {
      return HttpResponse.json({ message: "No encontrado" }, { status: 404 });
    }
  }),
  http.get('/api/fav/recipes', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || 1);
    console.log("[MSW] Interceptando solicitud a /api/fav/recipes");

    return HttpResponse.json({
      data: [
        { id: 1, title: 'Receta mock' },
        { id: 2, title: 'Otra receta mock' }
      ],
      currentPage: page,
      totalPages: 1,
    });
  }),

  // También mock de mealpreps
  http.get('/api/fav/mealpreps', ({ request }) => {
        console.log("[MSW] Interceptando solicitud a /api/fav/mealpreps");

    return HttpResponse.json({
      data: [{ id: 1, title: 'MealPrep Mock' }],
      currentPage: 1,
      totalPages: 1,
    });
  }),
];
