import { useEffect, useState } from 'react';
import { Card } from './Card';
import { Character } from '../shared/types';
import { Loader } from './Loader/Loader';
import { SearchFallback } from './SearchFallback';

interface SearchResultsProps {
  searchTerm: string;
  showError: boolean;
}

export const SearchResults = ({
  searchTerm,
  showError,
}: SearchResultsProps) => {
  const [count, setCount] = useState(0);
  const [results, setResults] = useState<Character[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async (text: string) => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://swapi.dev/api/people/?search=${text.trim()}`
      );

      const data = await response.json();
      setCount(data.count);
      setResults(data.results);
      setLoading(false);
    } catch {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (showError) {
      throw new Error('May the 4th be with u');
    }
  }, [showError]);

  if (error) {
    return <SearchFallback />;
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-black">
          {count > 0
            ? `Search of the Galactic Republic found ${count} creatures`
            : 'No Creatures Found'}
        </h1>
      </div>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {results.map((character) => (
              <Card key={character.url} character={character} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
