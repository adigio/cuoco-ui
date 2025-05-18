import { mocksIngredients } from '@/mocks/ingredients';
import { http, HttpResponse } from 'msw';


//Define como se responde a las APIs mockeadas

export const handlers = [
  http.post('/api/analyze-images', async ({ request }) => {
    // const body = await request.json();
    
    console.log('[MSW] Interceptando solicitud a /api/analyze-images');
    
    return HttpResponse.json(mocksIngredients, { status: 200 });
  }),
];