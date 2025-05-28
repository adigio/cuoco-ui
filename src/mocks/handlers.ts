import { mocksIngredients } from "@/mocks/ingredients";
import { mockDetailsRecipes, mockRecipes } from "@/mocks/recipes";
import { http, HttpResponse } from "msw";

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
    const body = await request.json(); // <-- ¡esto es clave!

    // Protección contra `undefined`
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
];
