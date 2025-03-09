import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';
import { ThemeProvider } from '../../context/ThemeContext';
import Header from '../Header/Header';

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

  it('toggles theme from black to color correctly', () => {
    render(
      <ThemeProvider>
        <Header />
        <Footer />
      </ThemeProvider>
    );
    const footer = screen.getByTestId('test-footer');
    expect(footer).toHaveClass('bg-black');
    const toggleSwitch = screen.getByText('Color Mode');
    fireEvent.click(toggleSwitch);
    expect(footer).toHaveClass('bg-indigo-950');
  });
});
