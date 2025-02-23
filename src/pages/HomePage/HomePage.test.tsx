import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import HomePage from './HomePage';
import { ThemeProvider } from '../../context/ThemeContext';

describe('Renders HomePage Correctly', () => {
  it('has proper container', () => {
    render(
      <ThemeProvider>
        <HomePage />
      </ThemeProvider>
    );
    const container = screen.getByTestId('homecontent-container');
    expect(container).toBeInTheDocument();
  });
});
