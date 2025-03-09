import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { HomeContent } from './HomeContent';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ThemeProvider } from '../../context/ThemeContext';
import { mockResponseForLuke } from '../../mocks/data';

const mockPush = vi.fn();
const mockRouterEvents = {
  on: vi.fn(),
  off: vi.fn(),
};

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
    query: {},
    events: mockRouterEvents,
  }),
}));

describe('HomeContent Component', () => {
  it('renders scheleton correctly', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <HomeContent charactersData={mockResponseForLuke} />
        </ThemeProvider>
      </Provider>
    );

    expect(
      screen.getByTestId('homecontent-panel-container')
    ).toBeInTheDocument();
    expect(screen.getByTestId('info-panel-container')).toBeInTheDocument();
  });
});
