import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Pager } from './Pager';
import { MemoryRouter, useSearchParams } from 'react-router';

vi.mock('react-router', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router');
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

describe('Pager Component', () => {
  let setSearchParams = vi.fn();

  beforeEach(() => {
    setSearchParams = vi.fn();
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(),
      setSearchParams,
    ]);
  });

  it('disables Prev and Next buttons when URLs are null', () => {
    render(
      <MemoryRouter>
        <Pager prevUrl={null} nextUrl={null} />
      </MemoryRouter>
    );

    expect(screen.getByText('Prev')).toHaveClass('bg-gray-400 text-gray-800');
    expect(screen.getByText('Next')).toHaveClass('bg-gray-400 text-gray-800');
  });

  it('enables Prev button when prevUrl is available, disables Next button', () => {
    render(
      <MemoryRouter>
        <Pager prevUrl="https://swapi.dev/api/people/?page=1" nextUrl={null} />
      </MemoryRouter>
    );

    expect(screen.getByText('Prev')).toHaveClass(
      'cursor-pointer hover:bg-gray-800'
    );
    expect(screen.getByText('Next')).toHaveClass('bg-gray-400 text-gray-800');
  });

  it('enables Next button when nextUrl is available, disables Prev button', () => {
    render(
      <MemoryRouter>
        <Pager prevUrl={null} nextUrl="https://swapi.dev/api/people/?page=3" />
      </MemoryRouter>
    );

    expect(screen.getByText('Next')).toHaveClass(
      'cursor-pointer hover:bg-gray-800'
    );
    expect(screen.getByText('Prev')).toHaveClass('bg-gray-400 text-gray-800');
  });

  it('updates page in the URL correctly', () => {
    render(
      <MemoryRouter>
        <Pager
          prevUrl="https://swapi.dev/api/people/?page=1"
          nextUrl="https://swapi.dev/api/people/?page=3"
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Prev'));
    expect(setSearchParams).toHaveBeenCalledWith({ page: '1' });
    fireEvent.click(screen.getByText('Next'));
    expect(setSearchParams).toHaveBeenCalledWith({ page: '3' });
  });
});
