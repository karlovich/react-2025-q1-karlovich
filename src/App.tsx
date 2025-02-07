import './App.css';
import { MainPage } from './components/MainPage';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
const App = () => {
  return (
    <>
      <Header />
      <main className="p-4 bg-white text-black">
        <MainPage />
      </main>
      <Footer />
    </>
  );
};

export default App;
