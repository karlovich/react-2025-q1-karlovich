import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import { SearchResults } from './SearchResults';
import { Character } from '../../shared/types';
import { Provider } from 'react-redux';
import { store } from '../../app/store';

vi.mock('react-router', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router');
  return {
    ...actual,
    useSearchParams: vi.fn(() => [new URLSearchParams(), vi.fn()]),
  };
});

const mockCharacters: Character[] = [
  {
    name: 'Luke Skywalker',
    gender: 'male',
    url: 'https://swapi.dev/api/people/1/',
    birth_year: '19BBY',
    height: 172,
    mass: 77,
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'n/a',
  },
  {
    name: 'Darth Vader',
    gender: 'male',
    url: 'https://swapi.dev/api/people/4/',
    birth_year: '41.9BBY',
    height: 202,
    mass: 136,
    hair_color: 'none',
    skin_color: 'white',
    eye_color: 'yellow',
  },
];

const fetchMock = vi.spyOn(globalThis, 'fetch');

describe('SearchResults Component', () => {
  it('renders loading state initially', () => {
    render(
      <MemoryRouter>
        <SearchResults searchTerm="Luke" showError={false} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('test-loader-img')).toBeInTheDocument();
  });

  it('fetches and displays search results', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        count: mockCharacters.length,
        results: mockCharacters,
        next: null,
        previous: null,
      }),
    } as Response);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <SearchResults searchTerm="Luke" showError={false} />
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
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        count: 0,
        results: [],
        next: null,
        previous: null,
      }),
    } as Response);

    render(
      <MemoryRouter>
        <SearchResults searchTerm="test" showError={false} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No Creatures Found')).toBeInTheDocument();
    });
  });

  it('displays error fallback UI when an error occurs', async () => {
    fetchMock.mockRejectedValueOnce(new Error('API Error'));

    render(
      <MemoryRouter>
        <SearchResults searchTerm="Error" showError={false} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('test-search-fallback')).toBeInTheDocument();
    });
  });

  it('throws an error when showError is true', () => {
    expect(() => {
      render(
        <MemoryRouter>
          <SearchResults searchTerm="Luke" showError={true} />
        </MemoryRouter>
      );
    }).toThrow('May the 4th be with u');
  });
});
