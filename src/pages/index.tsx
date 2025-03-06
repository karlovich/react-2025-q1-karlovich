import { HomeContent } from '@/components/HomeContent/HomeContent';
import { ThemeProvider } from '@/context/ThemeContext';
import { store } from '@/store/store';
import { Provider } from 'react-redux';

export default function Home() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <HomeContent />
      </ThemeProvider>
    </Provider>
  );
}
