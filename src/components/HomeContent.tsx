import { useEffect, useState } from 'react';
import { SearchBar } from './SearchBar';
import { SearchResults } from './SearchResults';
import { ErrorButton } from './ErrorButton';
import { ErrorBoundary } from './ErrorBoundary';
import { SearchFallback } from './SearchFallback';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Outlet, useParams } from 'react-router';

export const HomeContent = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage();
  const [raiseError, setRaiseError] = useState(false);
  const [infoPanelVisibility, setInfoPanelVisibility] = useState(false);
  const { id } = useParams();
  const onSearch = (text: string) => {
    setRaiseError(false);
    setSearchTerm(text);
  };

  const onRaiseError = () => {
    setRaiseError(true);
  };

  useEffect(() => {
    setInfoPanelVisibility(id !== undefined);
  }, [id]);

  return (
    <div className="flex">
      <div
        className={`transition-width duration-300 ${infoPanelVisibility ? 'w-2/3' : 'w-full'}`}
      >
        <SearchBar searchTerm={searchTerm} onSearch={onSearch} />
        <ErrorBoundary fallbackUI={<SearchFallback />} tryAgain={!raiseError}>
          <SearchResults searchTerm={searchTerm} showError={raiseError} />
        </ErrorBoundary>
        <div className="flex p-4 justify-end">
          <ErrorButton onRaiseError={onRaiseError} />
        </div>
      </div>
      <div
        className={`bg-gray-200 transition-width duration-300 ${infoPanelVisibility ? 'w-1/3 p-2' : 'w-0'}`}
      >
        <Outlet />
      </div>
    </div>
  );
};
