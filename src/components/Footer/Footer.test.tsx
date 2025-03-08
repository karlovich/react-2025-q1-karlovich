import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';
import { ThemeProvider } from '../../context/ThemeContext';

describe('Footer Component', () => {
  it('has header tag', () => {
    render(
      <ThemeProvider>
        <Footer />
      </ThemeProvider>
    );
    const footer = screen.getByTestId('test-footer');
    expect(footer.tagName).toBe('FOOTER');
  });
});
