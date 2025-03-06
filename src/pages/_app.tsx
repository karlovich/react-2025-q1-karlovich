import { AppProps } from 'next/app';

import '@/styles/globals.css';
import Layout from '@/components/Layout/Layout';
import { ThemeProvider } from '@/context/ThemeContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
