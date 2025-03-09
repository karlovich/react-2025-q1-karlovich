'use client';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import { ToastMessage } from '../ToastMessage/ToastMessage';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ThemeProvider } from '@/context/ThemeContext';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider>
          <Navigation />
          <Header />
          <main>{children}</main>
          <Footer />
          <ToastMessage />
        </ThemeProvider>
      </Provider>
    </>
  );
}
