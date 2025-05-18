import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/analyze-images', async ({ request }) => {
    // const body = await request.json();
    
    console.log('[MSW] Interceptando solicitud a /api/analyze-images');
    
    return HttpResponse.json([
      { nombre: 'Tomate', fuente: 'imagen', confirmado: false },
      { nombre: 'Queso', fuente: 'imagen', confirmado: false },
    ], { status: 200 });
  }),
];