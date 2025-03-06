import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router';
import { HomeContent } from './HomeContent';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ThemeProvider } from '../../context/ThemeContext';

describe('HomeContent Component', () => {
  it('renders scheleton correctly', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <HomeContent />
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(
      screen.getByTestId('homecontent-panel-container')
    ).toBeInTheDocument();
    expect(screen.getByTestId('info-panel-container')).toBeInTheDocument();
  });

  it('renders info panel container having character ID in URL', () => {
    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Provider store={store}>
          <ThemeProvider>
            <Routes>
              <Route path="/character/:id" element={<HomeContent />} />
            </Routes>
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );

    const infoPanel = screen.getByTestId('info-panel-container');
    expect(infoPanel).toHaveClass('w-1/3');
  });
});
