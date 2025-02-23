import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Pager } from './Pager';
import { MemoryRouter } from 'react-router';

vi.mock('react-router', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router');
  return {
    ...actual,
  };
});

describe('Pager Component', () => {
  it('renders the Prev and Next buttons', () => {
    render(
      <MemoryRouter>
        <Pager prevUrl={null} nextUrl={null} />
      </MemoryRouter>
    );

    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('disables Prev and Next buttons when URLs are null', () => {
    render(
      <MemoryRouter>
        <Pager prevUrl={null} nextUrl={null} />
      </MemoryRouter>
    );

    const prevButton = screen.getByText('Prev');
    const nextButton = screen.getByText('Next');

    expect(prevButton).toHaveClass('bg-gray-400 text-gray-800');
    expect(nextButton).toHaveClass('bg-gray-400 text-gray-800');
  });

  it('enables Prev button when prevUrl is available', () => {
    render(
      <MemoryRouter>
        <Pager prevUrl="https://swapi.dev/api/people/?page=1" nextUrl={null} />
      </MemoryRouter>
    );

    const prevButton = screen.getByText('Prev');
    expect(prevButton).toHaveClass('cursor-pointer hover:bg-gray-800');
  });

  it('enables Next button when nextUrl is available', () => {
    render(
      <MemoryRouter>
        <Pager prevUrl={null} nextUrl="https://swapi.dev/api/people/?page=2" />
      </MemoryRouter>
    );

    const nextButton = screen.getByText('Next');
    expect(nextButton).toHaveClass('cursor-pointer hover:bg-gray-800');
  });
});
