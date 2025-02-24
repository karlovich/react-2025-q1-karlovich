import { useTheme } from '../../context/ThemeContext';

export const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer
      data-testid="test-footer"
      className={`${theme === 'dark-mode' ? 'bg-black text-white' : 'bg-indigo-950 text-stone-300'} p-4`}
    >
      <h5 className="text-center">
        <a
          href="https://github.com/karlovich/"
          target="_blank"
          rel="noreferrer"
        >
          github: karlovich. RS React 2025 Q1.
        </a>
      </h5>
    </footer>
  );
};
