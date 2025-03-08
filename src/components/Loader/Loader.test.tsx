import { render, screen } from '@testing-library/react';
import { beforeEach, describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Loader from './Loader';
import fadeCircles from '@/assets/fade-stagger-circles.svg';

let loaderImg: HTMLElement;

describe('Loader Component', () => {
  beforeEach(() => {
    render(<Loader />);
    loaderImg = screen.getByTestId('test-loader-img');
  });

  // it('has correct image src and className', () => {
  //   expect(loaderImg).toBeVisible();
  //   expect(loaderImg).toHaveAttribute('src', fadeCircles);
  //   expect(loaderImg).toHaveClass('loader-img');
  // });

  it('image parent has correct className', () => {
    render(<Loader />);
    const parent = loaderImg.parentElement;
    expect(parent).toHaveClass('loader');
  });
});
