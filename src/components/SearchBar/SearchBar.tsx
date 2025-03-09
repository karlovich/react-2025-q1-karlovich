import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
}

export const SearchBar = ({ searchTerm, onSearch }: SearchBarProps) => {
  const { theme } = useTheme();
  const [searchInput, setSearchInput] = useState(searchTerm ?? '');

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onSearch(searchInput);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="flex space-x-2 justify-center w-full max-w-md mx-auto">
      <input
        onChange={onInputChange}
        onClick={(e) => e.stopPropagation()}
        className="border border-black p-2 rounded bg-white text-black w-full"
        type="text"
        placeholder="Search..."
        value={searchInput}
        data-testid="search-input-test"
      />
      <button
        onClick={onButtonClick}
        className={`${theme === 'dark-mode' ? 'bg-slate-950 text-white hover:bg-slate-700' : 'bg-amber-200 text-black hover:bg-amber-100'} font-bold p-2 rounded cursor-pointer`}
      >
        Search
      </button>
    </div>
  );
};
