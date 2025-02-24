import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { SearchFallback } from './SearchFallback';

describe('SearchFallback Component', () => {
  it('renders error message', () => {
    render(<SearchFallback />);

    expect(screen.getByTestId('test-search-fallback')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Unfortunately, search results are empty. Please make search once again or'
      )
    ).toBeInTheDocument();
  });

  it('contains a refresh link', () => {
    render(<SearchFallback />);

    const link = screen.getByTestId('test-search-fallback-link');
    expect(link).toHaveAttribute('href', '/');
  });
});
