import { Link, Outlet, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage/HomePage';
import { Page404 } from './pages/Page404/Page404';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { About } from './pages/About/About';
import { InfoPanel } from './components/InfoPanel/InfoPanel';
import { ToastMessage } from './components/ToastMessage/ToastMessage';
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
  return (
    <>
      <Header />
      <main className="p-4 bg-white text-black">
        <Outlet />
      </main>
      <Footer />
      <ToastMessage />
    </>
  );
};

const Navigation = () => {
  return (
    <nav className="bg-black text-white p-4 text-2xl font-bold flex gap-4 border-b-2 border-white">
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
