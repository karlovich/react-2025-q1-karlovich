'use client';

import { useState } from 'react';
import { Card } from '../Card/Card';
import { SearchFallback } from '../SearchFallback/SearchFallback';
import { Pager } from '../Pager/Pager';
import { useTheme } from '../../context/ThemeContext';
import { CharacterSearchResults } from '@/shared/types';
import Loader from '../Loader/Loader';

interface SearchResultsProps {
  searchTerm: string;
  data: CharacterSearchResults;
}

export const SearchResults = ({ data }: SearchResultsProps) => {
  const { theme } = useTheme();
  const [loading] = useState(false);

  if (loading) return <Loader />;

  if (data === undefined || data.count === 0) {
    return <SearchFallback />;
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1
          className={`${theme === 'dark-mode' ? 'text-black' : 'text-cyan-900'} text-xl font-bold `}
        >
          Search of the Galactic Republic found {data.count} creatures
        </h1>
      </div>
      <div>
        <Pager nextUrl={data.next} prevUrl={data.previous} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.results &&
            data.results.map((character) => (
              <Card key={character.url} character={character} />
            ))}
        </div>
      </div>
    </div>
  );
};
