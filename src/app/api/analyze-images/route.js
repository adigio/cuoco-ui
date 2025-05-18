import { server } from '@/mocks/server';

// init server MSW solo en desarrollo
if (process.env.NODE_ENV === 'development') {
    server.listen();
}

export async function POST(request) {
    // TODO: ver el tema de estructurar mocks
    return Response.json([
        { nombre: 'API real', fuente: 'imagen', confirmado: false },
    ]);

}