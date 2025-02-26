import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from './Footer';

describe('Footer Component', () => {
  it('has header tag', () => {
    render(<Footer />);
    const footer = screen.getByTestId('test-footer');
    expect(footer.tagName).toBe('FOOTER');
  });
});
