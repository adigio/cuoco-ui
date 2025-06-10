import { mocksIngredients } from "@/mocks/ingredients";
import { mockDetailsRecipes, mockRecipes } from "@/mocks/recipes";
import { mealPreps } from "@/mocks/mealprep";
import { User } from "@/types/auth/auth.types";
import { http, HttpResponse } from "msw";
import { MealPrepGenerationRequest } from "@/types";
import { mockCategorizedFavorites, mockSchedule } from "@/mocks/calendar";

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
  // http.post("/api/login", async ({ request }) => {
  //   const body = await request.json();

  //   if (!body || typeof body !== "object") {
  //     return HttpResponse.json({ message: "Bad request" }, { status: 400 });
  //   }

  //   const { email, password } = body;

  //   console.log("[MSW] Login:", { email, password });

  //   if (email === "test@cuoco.com" && password === "123456") {
  //     return HttpResponse.json({
  //       user: {
  //         name: "Usuario Free",
  //         email,
  //         token: "fake-jwt-123",
  //         premium: false,
  //         preferences: {
  //           cookingLevel: "Medio",
  //           diet: "Omnívoro",
  //           dietaryRestrictions: ["Sin lactosa"],
  //           allergies: [],
  //           favoriteCuisines: []
  //         }
  //       },
  //     });
  //   }
  //   if (email === "premium@cuoco.com" && password === "123456") {
  //     return HttpResponse.json({
  //       user: {
  //         name: "Usuario Premium",
  //         email,
  //         token: "fake-jwt-123",
  //         premium: true,
  //         preferences: {
  //           cookingLevel: "Alto",
  //           diet: "Vegetariano",
  //           dietaryRestrictions: ["Sin gluten"],
  //           allergies: ["Maní"],
  //           favoriteCuisines: [],
  //         },
  //       },
  //     });
  //   }

  //   return HttpResponse.json(
  //     { message: "Credenciales inválidas" },
  //     { status: 401 }
  //   );
  // }),
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
      name: string;
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
      premium: false,
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
  http.get("/api/fav/recipes", ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || 1);
    const limit = Number(url.searchParams.get("limit") || 2); // valor por defecto

    console.log("[MSW] Interceptando solicitud a /api/fav/recipes", {
      page,
      limit,
    });

    // Suponiendo que mockRecipes es un array plano
    const allRecipes = mockRecipes;
    const start = (page - 1) * limit;
    const end = start + limit;

    const paginated = allRecipes.slice(start, end);
    const totalPages = Math.ceil(allRecipes.length / limit);

    return HttpResponse.json({
      data: paginated,
      currentPage: page,
      totalPages,
    });
  }),

  // También mock de mealpreps
  http.get("/api/fav/mealpreps", ({ request }) => {
    console.log("[MSW] Interceptando solicitud a /api/fav/mealpreps");

    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || "1");
    const limit = Number(url.searchParams.get("limit") || "2");

    // Datos simulados (puede venir de tu archivo de mocks)
    const allMealPreps = mealPreps; // tu array original
    const start = (page - 1) * limit;
    const end = start + limit;

    const paginated = allMealPreps.slice(start, end);
    const totalPages = Math.ceil(allMealPreps.length / limit);

    return HttpResponse.json({
      data: paginated,
      currentPage: page,
      totalPages,
    });
  }),

  http.post("/api/getRecipe", async ({ request }) => {
    const body = (await request.json()) as { nombre: string };

    console.log("[MSW] Interceptando receta rápida:", body);

    const nombre = body.nombre || "sin-nombre";

    return HttpResponse.json(mockDetailsRecipes[1], { status: 200 });
  }),


  /* calendario */
  http.get('/api/calendar/weekly', () => {
    return HttpResponse.json(mockSchedule);
  }),

  http.get('/api/calendar/favorites/categorized', () => {
    return HttpResponse.json(mockCategorizedFavorites);
  }),


  http.put('/api/calendar/update', async ({ request }) => {
    const body = (await request.json()) as { day: string; recipeId: number; mealType: string };
    const { day, recipeId, mealType } = body;
    return HttpResponse.json(mockSchedule);
  }),
];
