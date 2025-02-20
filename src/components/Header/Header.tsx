import { useTheme } from '../../context/ThemeContext';
export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header
      className={`${theme === 'bw' ? 'bg-black text-white' : 'bg-white text-black'} p-4 flex justify-between`}
      data-testid="test-header"
    >
      <h1 className="text-2xl font-bold text-center">
        Star Wars Universe: Find Information About Your Favorite Characters
      </h1>

      <label
        className="inline-flex items-center cursor-pointer"
        onChange={toggleTheme}
      >
        <input type="checkbox" value="" className="sr-only peer" />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
        <span
          className={`${theme === 'bw' ? 'text-white' : 'text-black'} ms-3 text-sm font-medium `}
        >
          Toggle theme
        </span>
      </label>
    </header>
  );
};
