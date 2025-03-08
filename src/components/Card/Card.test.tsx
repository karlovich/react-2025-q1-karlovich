import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Card } from './Card';
import { Character } from '../../shared/types';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { add, remove } from '../../features/cardStoreSlice';
import { ThemeProvider } from '../../context/ThemeContext';
import React from 'react';

const mockPush = vi.fn();

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
    query: {},
  }),
}));

const mockedCharacter: Character = {
  name: 'Luke Skywalker',
  gender: 'male',
  url: 'https://swapi.dev/api/people/1/',
  birth_year: '19BBY',
  height: 172,
  mass: 77,
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'n/a',
};

describe('Card Component', () => {
  it('renders correctly and navigates to the correct URL when clicked', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Card character={mockedCharacter} />
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
    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/characters/1',
      query: {},
    });
  });

  it('dispatches add action when checkbox is checked', () => {
    const dispatch = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <ThemeProvider>
          <Card character={mockedCharacter} />
        </ThemeProvider>
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(dispatch).toHaveBeenCalledWith(add(mockedCharacter));
  });

  it('dispatches remove action when checkbox is unchecked', () => {
    const dispatch = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <ThemeProvider>
          <Card character={mockedCharacter} />
        </ThemeProvider>
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);

    expect(dispatch).toHaveBeenCalledWith(remove(mockedCharacter));
  });
});
