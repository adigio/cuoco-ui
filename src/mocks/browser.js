
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Setup del mock service worker para el navegador
export const worker = setupWorker(...handlers);