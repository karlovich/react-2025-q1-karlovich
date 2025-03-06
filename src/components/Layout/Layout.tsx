import Header from '../Header/Header';
import { Footer } from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Navigation />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
