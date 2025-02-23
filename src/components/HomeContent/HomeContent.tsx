import { useEffect, useState } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { ErrorButton } from '../ErrorButton/ErrorButton';
import { ErrorBoundary } from '../ErrorBoundary';
import { SearchFallback } from '../SearchFallback/SearchFallback';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Outlet, useParams } from 'react-router';
import { useTheme } from '../../context/ThemeContext';

export const HomeContent = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage();
  const [raiseError, setRaiseError] = useState(false);
  const { theme } = useTheme();
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
    <div className="flex" data-testid="homecontent-container">
      <div
        className={`transition-width duration-300 ${infoPanelVisibility ? 'w-2/3' : 'w-full'}`}
        data-testid="homecontent-panel-container"
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
        className={`${theme === 'dark-mode' ? 'bg-gray-200' : 'bg-sky-600'} p-4 transition-width duration-300 ${infoPanelVisibility ? 'w-1/3 p-2' : 'w-0'}`}
        data-testid="info-panel-container"
      >
        <Outlet />
      </div>
    </div>
  );
};
