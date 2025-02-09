import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Header } from './Header';

describe('Header Component', () => {
  it('has header tag', () => {
    render(<Header />);
    const header = screen.getByTestId('test-header');
    expect(header.tagName).toBe('HEADER');
  });
});
