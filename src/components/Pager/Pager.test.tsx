import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Pager } from './Pager';

describe('Pager Component', () => {
  it('renders the Prev and Next buttons', () => {
    render(<Pager prevUrl={null} nextUrl={null} onPaging={vi.fn()} />);

    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('disables Prev and Next buttons when URLs are null', () => {
    render(<Pager prevUrl={null} nextUrl={null} onPaging={vi.fn()} />);

    const prevButton = screen.getByText('Prev');
    const nextButton = screen.getByText('Next');

    expect(prevButton).toHaveClass('bg-gray-400 text-gray-800');
    expect(nextButton).toHaveClass('bg-gray-400 text-gray-800');
  });

  it('enables Prev button when prevUrl is available', () => {
    render(
      <Pager
        prevUrl="https://swapi.dev/api/people/?page=1"
        nextUrl={null}
        onPaging={vi.fn()}
      />
    );

    const prevButton = screen.getByText('Prev');
    expect(prevButton).toHaveClass('cursor-pointer hover:bg-gray-800');
  });

  it('enables Next button when nextUrl is available', () => {
    render(
      <Pager
        prevUrl={null}
        nextUrl="https://swapi.dev/api/people/?page=2"
        onPaging={vi.fn()}
      />
    );

    const nextButton = screen.getByText('Next');
    expect(nextButton).toHaveClass('cursor-pointer hover:bg-gray-800');
  });

  it('calls onPaging with the correct page when Prev is clicked', () => {
    const onPagingMock = vi.fn();
    render(
      <Pager
        prevUrl="https://swapi.dev/api/people/?page=1"
        nextUrl={null}
        onPaging={onPagingMock}
      />
    );

    fireEvent.click(screen.getByText('Prev'));
    expect(onPagingMock).toHaveBeenCalledWith('1');
  });

  it('calls onPaging with the correct page when Next is clicked', () => {
    const onPagingMock = vi.fn();
    render(
      <Pager
        prevUrl={null}
        nextUrl="https://swapi.dev/api/people/?page=2"
        onPaging={onPagingMock}
      />
    );

    fireEvent.click(screen.getByText('Next'));
    expect(onPagingMock).toHaveBeenCalledWith('2');
  });

  it('does not call onPaging when clicking disabled Prev button', () => {
    const onPagingMock = vi.fn();
    render(<Pager prevUrl={null} nextUrl={null} onPaging={onPagingMock} />);

    fireEvent.click(screen.getByText('Prev'));
    expect(onPagingMock).not.toHaveBeenCalled();
  });

  it('does not call onPaging when clicking disabled Next button', () => {
    const onPagingMock = vi.fn();
    render(<Pager prevUrl={null} nextUrl={null} onPaging={onPagingMock} />);

    fireEvent.click(screen.getByText('Next'));
    expect(onPagingMock).not.toHaveBeenCalled();
  });
});
