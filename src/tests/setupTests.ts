import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { handlers } from '../mocks/hanlers';

const server = setupServer(...handlers);

server.events.on('request:start', ({ request }) => {
  console.log('Outgoing:', request.method, request.url);
});

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test for test isolation
afterEach(() => server.resetHandlers());
