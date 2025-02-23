import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { handlers } from '../mocks/hanlers';

const server = setupServer(...handlers);

server.events.on('request:start', ({ request }) => {
  console.log('Outgoing:', request.method, request.url);
});

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterAll(() => server.close());

afterEach(() => server.resetHandlers());
