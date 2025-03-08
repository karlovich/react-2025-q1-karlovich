import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import { Pager } from './Pager';
import { ThemeProvider } from '../../context/ThemeContext';

const mockPush = vi.fn();

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
    query: { page: '2' },
  }),
}));

describe('Pager Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  // let setSearchParams = vi.fn();

  // beforeEach(() => {
  //   setSearchParams = vi.fn();
  //   vi.mocked(useSearchParams).mockReturnValue([
  //     new URLSearchParams(),
  //     setSearchParams,
  //   ]);
  // });

  // it('disables Prev and Next buttons when URLs are null', () => {
  //   render(
  //     <ThemeProvider>
  //       <Pager prevUrl={null} nextUrl={null} />
  //     </ThemeProvider>
  //   );

  //   expect(screen.getByText('Prev')).toHaveClass(
  //     'hover:bg-zinc-400 bg-zinc-400'
  //   );
  //   expect(screen.getByText('Next')).toHaveClass(
  //     'hover:bg-zinc-400 bg-zinc-400'
  //   );
  // });

  // it('enables Prev button when prevUrl is available, disables Next button', () => {
  //   render(
  //     <ThemeProvider>
  //       <Pager prevUrl="https://swapi.dev/api/people/?page=1" nextUrl={null} />
  //     </ThemeProvider>
  //   );

  //   expect(screen.getByText('Prev')).toHaveClass('cursor-pointer');
  //   expect(screen.getByText('Next')).toHaveClass(
  //     'hover:bg-zinc-400 bg-zinc-400'
  //   );
  // });

  // it('enables Next button when nextUrl is available, disables Prev button', () => {
  //   render(
  //     <ThemeProvider>
  //       <Pager prevUrl={null} nextUrl="https://swapi.dev/api/people/?page=3" />
  //     </ThemeProvider>
  //   );

  //   expect(screen.getByText('Next')).toHaveClass('cursor-pointer');
  //   expect(screen.getByText('Prev')).toHaveClass(
  //     'hover:bg-zinc-400 bg-zinc-400'
  //   );
  // });

  it('updates page in the URL correctly when Prev clicked', () => {
    render(
      <ThemeProvider>
        <Pager
          prevUrl="https://swapi.dev/api/people/?page=1"
          nextUrl="https://swapi.dev/api/people/?page=3"
        />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Prev'));
    expect(mockPush).toHaveBeenCalledWith({
      query: { page: '1' },
    });
  });

  it('updates page in the URL correctly when Next clicked', () => {
    render(
      <ThemeProvider>
        <Pager
          prevUrl="https://swapi.dev/api/people/?page=1"
          nextUrl="https://swapi.dev/api/people/?page=3"
        />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Next'));
    expect(mockPush).toHaveBeenCalledWith({
      query: { page: '3' },
    });
  });
});
