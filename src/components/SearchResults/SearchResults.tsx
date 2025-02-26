import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Card } from '../Card/Card';
import { Character } from '../../shared/types';
import { Loader } from '../Loader/Loader';
import { SearchFallback } from '../SearchFallback/SearchFallback';
import { Pager } from '../Pager/Pager';

interface SearchResultsProps {
  searchTerm: string;
  showError: boolean;
}

export const SearchResults = ({
  searchTerm,
  showError,
}: SearchResultsProps) => {
  const [, setSearchParams] = useSearchParams();
  const [count, setCount] = useState(0);
  const [results, setResults] = useState<Character[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);

  const fetchData = async (text: string, page: string) => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://swapi.dev/api/people/?search=${text.trim()}&page=${page}`
      );

      const data = await response.json();
      setCount(data.count);
      setResults(data.results);
      setNextUrl(data.next);
      setPrevUrl(data.previous);
      setLoading(false);
    } catch {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    // searchParams.delete('page');
    // setSearchParams(searchParams);
    fetchData(searchTerm, '');
  }, [searchTerm]);

  useEffect(() => {
    if (showError) {
      throw new Error('May the 4th be with u');
    }
  }, [showError]);

  if (error) {
    return <SearchFallback />;
  }

  const onPaging = (page: string) => {
    if (page) {
      setSearchParams({ page: page });
      fetchData(searchTerm, page);
    }
  };

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
          <>
            <Pager onPaging={onPaging} nextUrl={nextUrl} prevUrl={prevUrl} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {results &&
                results.map((character) => (
                  <Card key={character.url} character={character} />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
