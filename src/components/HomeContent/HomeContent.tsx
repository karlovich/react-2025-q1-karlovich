import { useState } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { ErrorButton } from '../ErrorButton/ErrorButton';
import { ErrorBoundary } from '../ErrorBoundary';
import { SearchFallback } from '../SearchFallback/SearchFallback';
// import { useLocalStorage } from '../../hooks/useLocalStorage';
// import { Outlet, useParams, useNavigate, useLocation } from 'react-router';
import { useTheme } from '../../context/ThemeContext';
import { InfoPanel } from '../InfoPanel/InfoPanel';
import { Character, CharacterSearchResults } from '@/shared/types';
import { useRouter } from 'next/router';

interface Props {
  charactersData: CharacterSearchResults;
  infoPanelVisibility?: boolean;
  character?: Character;
}

export const HomeContent = ({
  charactersData,
  infoPanelVisibility = false,
  character,
}: Props) => {
  // const [searchTerm, setSearchTerm] = useLocalStorage();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(router.query.search as string);
  const [raiseError, setRaiseError] = useState(false);
  const { theme } = useTheme();
  // const { id } = useParams();
  // const navigate = useNavigate();
  // const location = useLocation();
  const onSearch = (text: string) => {
    setRaiseError(false);
    setSearchTerm(text);
    router.push({
      query: { ...router.query, search: text },
    });
  };

  const onRaiseError = () => {
    setRaiseError(true);
  };

  const handleContainerClick = () => {
    // const searchParams = new URLSearchParams(location.search);
    // navigate(`/?${searchParams.toString()}`);
  };

  // useEffect(() => {
  //   setInfoPanelVisibility(id !== undefined);
  // }, [id]);

  return (
    <div className="flex" data-testid="homecontent-container">
      <div
        className={`transition-width duration-300 ${infoPanelVisibility ? 'w-2/3' : 'w-full'}`}
        data-testid="homecontent-panel-container"
        onClick={handleContainerClick}
      >
        <SearchBar searchTerm={searchTerm} onSearch={onSearch} />
        <ErrorBoundary fallbackUI={<SearchFallback />} tryAgain={!raiseError}>
          <SearchResults
            searchTerm={searchTerm}
            showError={raiseError}
            data={charactersData}
          />
        </ErrorBoundary>
        <div className="flex p-4 justify-end">
          <ErrorButton onRaiseError={onRaiseError} />
        </div>
      </div>
      <div
        className={`${theme === 'dark-mode' ? 'bg-gray-200' : 'bg-sky-600'} transition-width duration-300 ${infoPanelVisibility ? 'w-1/3' : 'w-0'}`}
        data-testid="info-panel-container"
      >
        <InfoPanel character={character} />
      </div>
    </div>
  );
};
