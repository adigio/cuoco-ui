import { rest } from 'msw';

export const handlers = [
  rest.post('/api/analyze-images', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { nombre: 'Tomate', fuente: 'imagen', confirmado: false },
        { nombre: 'Queso', fuente: 'imagen', confirmado: false },
      ])
    );
  }),
];
