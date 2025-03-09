import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { HomeContent } from './HomeContent';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ThemeProvider } from '../../context/ThemeContext';
import { mockResponseForLuke } from '../../mocks/data';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => new URLSearchParams('?page=2'),
  usePathname: () => '/',
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

  // it('renders info panel container having character ID in URL', () => {
  //   render(
  //     <MemoryRouter initialEntries={['/character/1']}>
  //       <Provider store={store}>
  //         <ThemeProvider>
  //           <Routes>
  //             <Route path="/character/:id" element={<HomeContent />} />
  //           </Routes>
  //         </ThemeProvider>
  //       </Provider>
  //     </MemoryRouter>
  //   );

  //   const infoPanel = screen.getByTestId('info-panel-container');
  //   expect(infoPanel).toHaveClass('w-1/3');
  // });
});
