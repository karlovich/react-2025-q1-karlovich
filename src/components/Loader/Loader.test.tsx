import { render, screen } from '@testing-library/react';
import { beforeEach, describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Loader from './Loader';

let loaderImg: HTMLElement;

describe('Loader Component', () => {
  beforeEach(() => {
    render(<Loader />);
    loaderImg = screen.getByTestId('test-loader-img');
  });

  it('image parent has correct className', () => {
    render(<Loader />);
    const parent = loaderImg.parentElement;
    expect(parent).toHaveClass('loader');
  });
});
