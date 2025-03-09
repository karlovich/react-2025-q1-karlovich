import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { SearchResults } from './SearchResults';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ThemeProvider } from '../../context/ThemeContext';
import { mockResponseForLuke, mockEmptyResponse } from '../../mocks/data';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => new URLSearchParams('?page=2'),
  usePathname: () => '/',
}));

describe('SearchResults Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
