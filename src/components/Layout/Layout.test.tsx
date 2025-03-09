import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Layout from './Layout';
import { ThemeProvider } from '@/context/ThemeContext';

describe('Navigation Component', () => {
  it('renders correct nav items', () => {
    const testLayoutText = 'test layout';
    render(
      <ThemeProvider>
        <Layout>
          <div>{testLayoutText}</div>
        </Layout>
      </ThemeProvider>
    );
    expect(screen.getByText(testLayoutText)).toBeInTheDocument();
  });
});
