import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { Card } from '../Card/Card';
import { Loader } from '../Loader/Loader';
import { SearchFallback } from '../SearchFallback/SearchFallback';
import { Pager } from '../Pager/Pager';
import { useSearchCharactersQuery } from '../../services/charactersApi';

interface SearchResultsProps {
  searchTerm: string;
  showError: boolean;
}

export const SearchResults = ({
  searchTerm,
  showError,
}: SearchResultsProps) => {
  const [searchParams] = useSearchParams();
  const { data, error, isLoading, isFetching } = useSearchCharactersQuery({
    searchTerm: searchTerm,
    page: searchParams.get('page') || '',
  });

  useEffect(() => {
    if (showError) {
      throw new Error('May the 4th be with u');
    }
  }, [showError]);

  if (isLoading || isFetching) return <Loader />;

  if (error || data === undefined || data.count === 0) {
    return <SearchFallback />;
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-black">
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
