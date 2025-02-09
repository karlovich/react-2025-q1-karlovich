import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import { Card } from './Card';
import { Character } from '../../shared/types';
import { useNavigate } from 'react-router';

vi.mock('react-router', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router'); // Assert type
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

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
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    render(
      <MemoryRouter>
        <Card character={mockedCharacter} />
      </MemoryRouter>
    );

    const card = screen.getByTestId('test-card');

    expect(card.childElementCount).toBe(2);
    const nameElement = screen.getByText('Name: Luke Skywalker');
    const genderElement = screen.getByText('Gender: male');
    expect(card).toContainElement(nameElement);
    expect(card).toContainElement(genderElement);

    fireEvent.click(card);
    expect(mockNavigate).toHaveBeenCalledWith('/characters/1');
  });
});
