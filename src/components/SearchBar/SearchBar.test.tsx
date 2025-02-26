import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { SearchBar } from './SearchBar';

describe('SearchBar Component', () => {
  it('renders input field and search button', () => {
    render(<SearchBar searchTerm="" onSearch={vi.fn()} />);

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('displays initial search term in the input field', () => {
    render(<SearchBar searchTerm="Luke" onSearch={vi.fn()} />);

    expect(screen.getByDisplayValue('Luke')).toBeInTheDocument();
  });

  it('updates input value when typing', () => {
    render(<SearchBar searchTerm="" onSearch={vi.fn()} />);

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'Vader' } });

    expect(screen.getByDisplayValue('Vader')).toBeInTheDocument();
  });

  it('calls onSearch with input value when search button is clicked', () => {
    const onSearchMock = vi.fn();
    render(<SearchBar searchTerm="" onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'Darth Vader' } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith('Darth Vader');
  });

  it('calls onSearch with the initial value when button is clicked without typing', () => {
    const onSearchMock = vi.fn();
    render(<SearchBar searchTerm="Leia" onSearch={onSearchMock} />);

    fireEvent.click(screen.getByText('Search'));

    expect(onSearchMock).toHaveBeenCalledWith('Leia');
  });
});
