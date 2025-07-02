import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Setup del mock server para testing 
export const server = setupServer(...handlers); 