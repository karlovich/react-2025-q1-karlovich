import { Link, Outlet, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage/HomePage';
import { Page404 } from './pages/Page404/Page404';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { About } from './pages/About/About';
import { InfoPanel } from './components/InfoPanel/InfoPanel';
import { ToastMessage } from './components/ToastMessage/ToastMessage';
import { useTheme } from './context/ThemeContext';

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />}>
            <Route path="characters/:id" element={<InfoPanel />} />
          </Route>

          <Route path="/about" element={<About />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </>
  );
};

const Layout = () => {
  const { theme } = useTheme();

  return (
    <>
      <Header />
      <main
        className={`${theme === 'dark-mode' ? 'bg-white text-black' : 'bg-sky-400 text-white'} p-4`}
      >
        <Outlet />
      </main>
      <Footer />
      <ToastMessage />
    </>
  );
};

const Navigation = () => {
  const { theme } = useTheme();

  return (
    <nav
      className={`${theme === 'dark-mode' ? 'bg-black text-white' : 'bg-blue-200 text-cyan-900'} p-4 text-2xl font-bold flex gap-4 border-b-2 border-white`}
    >
      <Link to="/" className="hover:text-gray-400">
        Home
      </Link>
      <Link to="/about" className="hover:text-gray-400">
        About
      </Link>
    </nav>
  );
};

export default App;
