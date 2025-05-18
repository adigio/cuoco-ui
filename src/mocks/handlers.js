import { mocksIngredients } from '@/mocks/ingredients';
import { mockDetailsRecipes, mockRecipes } from '@/mocks/recipes';
import { http, HttpResponse } from 'msw';


//Define como se responde a las APIs mockeadas

export const handlers = [
  http.post('/api/analyze-images', async ({ request }) => {
    // const body = await request.json();

    console.log('[MSW] Interceptando solicitud a /api/analyze-images');

    return HttpResponse.json(mocksIngredients, { status: 200 });
  }),

  http.post('/api/generate-recipes', async ({ request }) => {
    // const body = await request.json();

    console.log('[MSW] Interceptando solicitud a /api/generate-recipes');

    return HttpResponse.json(mockRecipes, { status: 200 });
  }),
  http.get('/api/recipe/:id', async ({ params }) => {
    console.log('[MSW] Interceptando solicitud a /api/recipe/:id');
    const id = parseInt(params.id, 10) - 1;
    console.log(id);
    return HttpResponse.json(mockDetailsRecipes[id], { status: 200 });
  }),

];