import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';

const Navigation = () => {
  const { theme } = useTheme();

  return (
    <nav
      className={`${theme === 'dark-mode' ? 'bg-black text-white' : 'bg-blue-200 text-cyan-900'} p-4 text-2xl font-bold flex gap-4 border-b-2 border-white`}
    >
      <Link href="/" className="hover:text-gray-400">
        Home
      </Link>
      <Link href="/about" className="hover:text-gray-400">
        About
      </Link>
    </nav>
  );
};

export default Navigation;
