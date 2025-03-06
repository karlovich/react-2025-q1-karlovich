import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { About } from '../about';
import React from 'react';

describe('Renders About Correctly', () => {
  it('has proper text', () => {
    render(<About />);
    const aboutText = screen.getByText('RS React 2025 Q1 by Karlovich');
    expect(aboutText).toBeInTheDocument();
  });
});
