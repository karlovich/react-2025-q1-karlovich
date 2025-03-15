import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import HomePage from './HomePage';
import { ThemeProvider } from '../../context/ThemeContext';

vi.mock('react-router', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router');
  return {
    ...actual,
  };
});

describe('Renders HomePage Correctly', () => {
  it('has proper container', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <HomePage />
        </ThemeProvider>
      </MemoryRouter>
    );
    const container = screen.getByTestId('homecontent-container');
    expect(container).toBeInTheDocument();
  });
});
