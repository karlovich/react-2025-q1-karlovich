import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router';
import { InfoPanel } from './InfoPanel';
import { Provider } from 'react-redux';
import { store } from '../../app/store';

vi.mock('react-router', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router');
  return {
    ...actual,
    useParams: vi.fn(() => ({ id: '1' })),
  };
});

describe('InfoPanel Component', () => {
  it('renders loading state initially', () => {
    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Provider store={store}>
          <Routes>
            <Route path="/character/:id" element={<InfoPanel />} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('test-loader-img')).toBeInTheDocument();
  });

  it('fetches and displays character details', async () => {
    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Provider store={store}>
          <Routes>
            <Route path="/character/:id" element={<InfoPanel />} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Galaxy ID: 1')).toBeInTheDocument();
      expect(screen.getByText('Name: Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('Gender: male')).toBeInTheDocument();
      expect(screen.getByText('Birth Year: 19BBY')).toBeInTheDocument();
      expect(screen.getByText('Height: 172')).toBeInTheDocument();
      expect(screen.getByText('Weight: 77')).toBeInTheDocument();
      expect(screen.getByText('Hair Color: blond')).toBeInTheDocument();
      expect(screen.getByText('Skin Color: fair')).toBeInTheDocument();
      expect(screen.getByText('Eye Color: n/a')).toBeInTheDocument();
    });
  });
});
