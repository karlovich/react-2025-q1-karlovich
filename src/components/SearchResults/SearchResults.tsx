import { useEffect, useState } from 'react';
import { Card } from '../Card/Card';
import { SearchFallback } from '../SearchFallback/SearchFallback';
import { Pager } from '../Pager/Pager';
import { useTheme } from '../../context/ThemeContext';
import { CharacterSearchResults } from '@/shared/types';
import { useRouter } from 'next/router';
import Loader from '../Loader/Loader';

interface SearchResultsProps {
  searchTerm: string;
  data: CharacterSearchResults;
}

export const SearchResults = ({ data }: SearchResultsProps) => {
  const { theme } = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const onChangeStart = (newUrl: string) => {
      const newPage = newUrl.match(/[?&]page=([^&]+)/)?.[1] || null;
      const currentPage = router.query.page || null;

      const newSearch = newUrl.match(/[?&]search=([^&]+)/)?.[1] || null;
      const currentSearch = router.query.search || null;

      if (newPage !== currentPage || newSearch !== currentSearch) {
        setLoading(true);
      }
    };
    const onChangeComplete = () => setLoading(false);
    router.events.on('routeChangeStart', onChangeStart);
    router.events.on('routeChangeComplete', onChangeComplete);

    return () => {
      router.events.off('routeChangeStart', onChangeStart);
      router.events.off('routeChangeComplete', onChangeComplete);
    };
  }, [router.events, router.query.page, router.query.search]);

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
