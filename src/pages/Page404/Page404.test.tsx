import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { Page404 } from './Page404';

describe('Renders Page404 Correctly', () => {
  it('has proper text', () => {
    render(<Page404 />);
    const text404 = screen.getByText('404 Not Found');
    expect(text404).toBeInTheDocument();
  });
});
