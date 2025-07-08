import { mocksIngredients } from "@/mocks/ingredients";
import { mockDetailsRecipes, mockRecipes } from "@/mocks/recipes";
import { mealPreps } from "@/mocks/mealprep";
import { User } from "@/types/auth/auth.types";
import { http, HttpResponse } from "msw";
import { MealPrepGenerationRequest } from "@/types"; 

//Define como se responde a las APIs mockeadas

export const handlers = [
  http.post("/api/analyze-images", async ({ request }) => { 

    return HttpResponse.json(mocksIngredients, { status: 200 });
  }), 
  http.get("/api/recipe/:id", async ({ params }) => { 
    const id = parseInt((params.id as string) || "0", 10) - 1; 
    return HttpResponse.json(mockDetailsRecipes[id], { status: 200 });
  }), 
  http.post("/api/reset-password", async ({ request }) => {
    const body = await request.json(); 
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
  // http.post("/api/register", async ({ request }) => {
  //   const body = (await request.json()) as {
  //     name: string;
  //     email: string;
  //     password: string;
  //     level: number;
  //     diet: number;
  //     foodNeeds: number[];
  //     allergies: number[];
  //   };

  //   const mockUser: User = {
  //     name: "Nuevo Usuario",
  //     email: body.email,
  //     token: "fake-jwt-register-123",
  //     premium: false,
  //     preferences: {
  //       cook_level: body.level,
  //       diet: body.diet,
  //       dietaryRestrictions: body.foodNeeds,
  //       allergies: body.allergies,
  //       favourite_cuisines: [],
  //     },
  //   };

  //   return HttpResponse.json({ user: mockUser });
  // }),

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
        cook_level: 2,
        diet: 1,
        dietaryRestrictions: [2],
        allergies: [0],
        favourite_cuisines: [],
      },
    };

    return HttpResponse.json({ user: mockUser });
  }),
  http.post("/api/generate-meal-prep", async ({ request }) => {
    const body = (await request.json()) as MealPrepGenerationRequest; 
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
    const limit = Number(url.searchParams.get("limit") || 2);  

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

    const nombre = body.nombre || "sin-nombre";

    return HttpResponse.json(mockDetailsRecipes[1], { status: 200 });
  }),


  /* calendario */
//   http.get('/api/calendar/weekly', () => {
//     return HttpResponse.json(mockSchedule);
//   }),

//   http.get('/api/calendar/favorites/categorized', () => {
//     return HttpResponse.json(mockCategorizedFavorites);
//   }),


//   http.put('/api/calendar/update', async ({ request }) => {
//     const body = (await request.json()) as { day: string; recipeId: number; mealType: string };
//     const { day, recipeId, mealType } = body;
//     return HttpResponse.json(mockSchedule);
//   }),
 ];
