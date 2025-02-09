import { useState } from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
}

export const SearchBar = ({ searchTerm, onSearch }: SearchBarProps) => {
  const [searchInput, setSearchInput] = useState(searchTerm);

  const onButtonClick = () => {
    onSearch(searchInput);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="flex space-x-2 justify-center w-full max-w-md mx-auto">
      <input
        onChange={onInputChange}
        className="border border-black p-2 rounded bg-white text-black w-full"
        type="text"
        placeholder="Search..."
        value={searchInput}
      />
      <button
        onClick={onButtonClick}
        className="bg-black text-white p-2 rounded cursor-pointer hover:bg-gray-800"
      >
        Search
      </button>
    </div>
  );
};
