import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import { Pager } from './Pager';
import { ThemeProvider } from '../../context/ThemeContext';
import Header from '../Header/Header';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => new URLSearchParams('?page=2'),
  usePathname: () => '/',
}));

describe('Pager Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

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
    expect(mockPush).toHaveBeenCalledWith('/?page=1');
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
    expect(mockPush).toHaveBeenCalledWith('/?page=3');
  });

  it('toggles theme from black to color correctly', () => {
    render(
      <ThemeProvider>
        <Header />
        <Pager
          prevUrl="https://swapi.dev/api/people/?page=1"
          nextUrl="https://swapi.dev/api/people/?page=3"
        />
      </ThemeProvider>
    );
    const prevBtn = screen.getByText('Prev');
    const nextBtn = screen.getByText('Next');
    expect(prevBtn).toHaveClass('bg-slate-950');
    expect(nextBtn).toHaveClass('bg-slate-950');
    const toggleSwitch = screen.getByText('Color Mode');
    fireEvent.click(toggleSwitch);
    expect(prevBtn).toHaveClass('bg-amber-200');
    expect(nextBtn).toHaveClass('bg-amber-200');
  });
});
