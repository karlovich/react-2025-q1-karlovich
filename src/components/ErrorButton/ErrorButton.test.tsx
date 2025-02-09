import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ErrorButton } from './ErrorButton';

describe('ErrorButton Component', () => {
  it('has header tag', () => {
    render(<ErrorButton onRaiseError={() => {}} />);
    const errorBtn = screen.getByTestId('test-error-button');
    expect(errorBtn.tagName).toBe('BUTTON');
  });
});
