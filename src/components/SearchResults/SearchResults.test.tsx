import { act, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { SearchResults } from './SearchResults';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ThemeProvider } from '../../context/ThemeContext';
import { mockResponseForLuke, mockEmptyResponse } from '../../mocks/data';

const mockPush = vi.fn();
const mockRouterEvents = {
  on: vi.fn(),
  off: vi.fn(),
};

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
    query: {},
    events: mockRouterEvents,
  }),
}));

describe('SearchResults Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', async () => {
    mockRouterEvents.on.mockImplementation((event, callback) => {
      if (event === 'routeChangeStart') {
        callback('/?page=2');
      }
      if (event === 'routeChangeComplete') {
        callback();
      }
    });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <SearchResults searchTerm="Luke" data={mockResponseForLuke} />
        </ThemeProvider>
      </Provider>
    );

    await act(async () => {
      mockRouterEvents.on.mock.calls[0][1]('/?page=2');
    });

    expect(screen.getByTestId('test-loader-img')).toBeInTheDocument();
  });

  it('fetches and displays search results', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <SearchResults searchTerm="Luke" data={mockResponseForLuke} />
        </ThemeProvider>
      </Provider>
    );

    expect(
      screen.getByText('Search of the Galactic Republic found 2 creatures')
    ).toBeInTheDocument();
    expect(screen.getByText('Name: Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Name: Darth Vader')).toBeInTheDocument();
  });

  it('displays empty search result message when no results are returned', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <SearchResults searchTerm="test" data={mockEmptyResponse} />
        </ThemeProvider>
      </Provider>
    );

    expect(
      screen.getByText(/Unfortunately, search results are empty./i)
    ).toBeInTheDocument();
  });
});
