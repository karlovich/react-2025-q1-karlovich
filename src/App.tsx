import { Link, Outlet, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import { Page404 } from './pages/Page404';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { About } from './pages/About';
import { InfoPanel } from './components/InfoPanel';

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
