import { HomeContent } from '../components/HomeContent/HomeContent';
import { ThemeProvider } from '../context/ThemeContext';
import { store } from '../app/store';
import { Provider } from 'react-redux';

const Index = () => {
  return (
    <>
      <div>Hellow World</div>
      <Provider store={store}>
        <ThemeProvider>
          <HomeContent />
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default Index;
