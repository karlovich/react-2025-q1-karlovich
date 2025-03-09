import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from './Header';
import { ThemeProvider } from '../../context/ThemeContext';

describe('Header Component', () => {
  it('has header tag', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );
    const header = screen.getByTestId('test-header');
    expect(header.tagName).toBe('HEADER');
  });
});
