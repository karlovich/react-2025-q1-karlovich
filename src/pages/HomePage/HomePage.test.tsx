import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import HomePage from './HomePage';

describe('Renders HomePage Correctly', () => {
  it('has proper container', () => {
    render(<HomePage />);
    const container = screen.getByTestId('homecontent-container');
    expect(container).toBeInTheDocument();
  });
});
