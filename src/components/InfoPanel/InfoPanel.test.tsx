import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { InfoPanel } from './InfoPanel';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ThemeProvider } from '../../context/ThemeContext';
import { mockedCharacterId1 } from '../../mocks/data';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => new URLSearchParams('?page=2'),
  usePathname: () => '/characters/1',
}));

describe('InfoPanel Component', () => {
  it('fetches and displays character details and closes panel correctly', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <InfoPanel character={mockedCharacterId1} />
        </ThemeProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(
        screen.getByText('Galaxy URL: https://swapi.dev/api/people/1/')
      ).toBeInTheDocument();
      expect(screen.getByText('Name: Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('Gender: male')).toBeInTheDocument();
      expect(screen.getByText('Birth Year: 19BBY')).toBeInTheDocument();
      expect(screen.getByText('Height: 172')).toBeInTheDocument();
      expect(screen.getByText('Weight: 77')).toBeInTheDocument();
      expect(screen.getByText('Hair Color: blond')).toBeInTheDocument();
      expect(screen.getByText('Skin Color: fair')).toBeInTheDocument();
      expect(screen.getByText('Eye Color: n/a')).toBeInTheDocument();
    });

    const closeBtn = screen.getByTestId('infopanel-close-btn');
    fireEvent.click(closeBtn);
    expect(mockPush).toHaveBeenCalledWith('/?page=2');
  });
});
