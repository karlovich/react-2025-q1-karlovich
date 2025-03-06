import { HomeContent } from '@/components/HomeContent/HomeContent';
import { store } from '@/store/store';
import { Provider } from 'react-redux';

export default function Home() {
  return (
    <Provider store={store}>
      <HomeContent />
    </Provider>
  );
}
