import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import { SearchResults } from './SearchResults';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ThemeProvider } from '../../context/ThemeContext';

vi.mock('react-router', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router');
  return {
    ...actual,
    useSearchParams: vi.fn(() => [new URLSearchParams(), vi.fn()]),
  };
});

describe('SearchResults Component', () => {
  it('renders loading state initially', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ThemeProvider>
            <SearchResults searchTerm="Luke" showError={false} />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('test-loader-img')).toBeInTheDocument();
  });

  it('fetches and displays search results', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ThemeProvider>
            <SearchResults searchTerm="Luke" showError={false} />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText('Search of the Galactic Republic found 2 creatures')
      ).toBeInTheDocument();
      expect(screen.getByText('Name: Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('Name: Darth Vader')).toBeInTheDocument();
    });
  });

  it("displays 'No Creatures Found' when no results are returned", async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ThemeProvider>
            <SearchResults searchTerm="test" showError={false} />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Unfortunately, search results are empty./i)
      ).toBeInTheDocument();
    });
  });

  it('throws an error when showError is true', () => {
    expect(() => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <ThemeProvider>
              <SearchResults searchTerm="Luke" showError={true} />
            </ThemeProvider>
          </Provider>
        </MemoryRouter>
      );
    }).toThrow('May the 4th be with u');
  });
});
