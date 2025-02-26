import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { SearchFallback } from './SearchFallback';

describe('SearchFallback Component', () => {
  it('renders error message', () => {
    render(<SearchFallback />);

    expect(screen.getByTestId('test-search-fallback')).toBeInTheDocument();
    expect(
      screen.getByText('Something went wrong, please make search once again or')
    ).toBeInTheDocument();
  });

  it('contains a refresh link', () => {
    render(<SearchFallback />);

    const link = screen.getByTestId('test-search-fallback-link');
    expect(link).toHaveAttribute('href', '/');
  });

  // it('has the correct styling', () => {
  //   render(<SearchFallback />);

  //   const fallbackDiv = screen.getByTestId('test-search-fallback');
  //   expect(fallbackDiv).toHaveClass(
  //     'text-red-500',
  //     'p-4',
  //     'm-4',
  //     'bg-white',
  //     'border',
  //     'border-red-500',
  //     'rounded'
  //   );
  // });
});
