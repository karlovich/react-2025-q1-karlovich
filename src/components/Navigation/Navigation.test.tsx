import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Navigation from './Navigation';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '../Header/Header';

describe('Navigation Component', () => {
  it('renders correct nav items', () => {
    render(
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('toggles theme from black to color correctly', () => {
    render(
      <ThemeProvider>
        <Navigation />
        <Header />
      </ThemeProvider>
    );
    expect(screen.getByTestId('navigation-test')).toHaveClass('bg-black');
    const toggleSwitch = screen.getByText('Color Mode');
    fireEvent.click(toggleSwitch);
    expect(screen.getByTestId('navigation-test')).toHaveClass('bg-blue-200');
  });
});
