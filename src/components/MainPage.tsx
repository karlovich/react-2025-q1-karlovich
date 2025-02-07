import { useState } from 'react';
import { SearchBar } from './SearchBar';
import { SearchResults } from './SearchResults';
import { ErrorButton } from './ErrorButton';
import { LocalStorageService } from '../services/LocalStorageService';
import { LOCAL_STORAGE_KEYS } from '../shared/constants';
import { ErrorBoundary } from './ErrorBoundary';
import { SearchFallback } from './SearchFallback';

export const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState(
    LocalStorageService.get(LOCAL_STORAGE_KEYS.SEARCH_TERM) || ''
  );
  const [raiseError, setRaiseError] = useState(false);

  const onSearch = (text: string) => {
    setRaiseError(false);
    setSearchTerm(text);
    LocalStorageService.set(LOCAL_STORAGE_KEYS.SEARCH_TERM, text.trim());
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
