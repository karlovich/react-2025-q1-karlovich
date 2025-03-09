import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Card } from './Card';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { add, remove } from '../../features/cardStoreSlice';
import { ThemeProvider } from '../../context/ThemeContext';
import React from 'react';
import { mockedCharacterId1 } from '../../mocks/data';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => new URLSearchParams('?page=2'),
  usePathname: () => '/',
}));

describe('Card Component', () => {
  it('renders correctly and navigates to the correct URL when clicked', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Card character={mockedCharacterId1} />
        </ThemeProvider>
      </Provider>
    );

    const card = screen.getByTestId('test-card');

    expect(card.childElementCount).toBe(3);
    const nameElement = screen.getByText('Name: Luke Skywalker');
    const genderElement = screen.getByText('Gender: male');
    expect(card).toContainElement(nameElement);
    expect(card).toContainElement(genderElement);

    fireEvent.click(card);
    expect(mockPush).toHaveBeenCalledWith('/characters/1?page=2');
  });

  it('dispatches add action when checkbox is checked', () => {
    const dispatch = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <ThemeProvider>
          <Card character={mockedCharacterId1} />
        </ThemeProvider>
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(dispatch).toHaveBeenCalledWith(add(mockedCharacterId1));
  });

  it('dispatches remove action when checkbox is unchecked', () => {
    const dispatch = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <ThemeProvider>
          <Card character={mockedCharacterId1} />
        </ThemeProvider>
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);

    expect(dispatch).toHaveBeenCalledWith(remove(mockedCharacterId1));
  });
});
