import { useState, useEffect } from 'react';
import { SearchBar } from './SearchBar';
import { SearchResults } from './SearchResults';
import { ErrorButton } from './ErrorButton';
import { ErrorBoundary } from './ErrorBoundary';
import { SearchFallback } from './SearchFallback';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const MainPage = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage();
  const [raiseError, setRaiseError] = useState(false);

  const onSearch = (text: string) => {
    setRaiseError(false);
    setSearchTerm(text);
  };

  const onRaiseError = () => {
    setRaiseError(true);
  };

  return (
    <>
      <SearchBar searchTerm={searchTerm} onSearch={onSearch} />
      <ErrorBoundary fallbackUI={<SearchFallback />} tryAgain={!raiseError}>
        <SearchResults searchTerm={searchTerm} showError={raiseError} />
      </ErrorBoundary>
      <div className="flex p-4 justify-end">
        <ErrorButton onRaiseError={onRaiseError} />
      </div>
    </>
  );
};
