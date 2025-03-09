'use client';
import { useState } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { useTheme } from '../../context/ThemeContext';
import { InfoPanel } from '../InfoPanel/InfoPanel';
import { Character, CharacterSearchResults } from '@/shared/types';
// import { useRouter } from 'next/navigation';

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
  // const router = useRouter();
  // const [searchTerm, setSearchTerm] = useState(router.query.search as string);
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();
  const onSearch = (text: string) => {
    setSearchTerm(text);
    // router.push({
    //   query: { ...router.query, search: text, page: '1' },
    // });
  };

  const handleContainerClick = () => {
    // router.push({
    //   pathname: `/`,
    //   query: { page: router.query.page, search: router.query.search },
    // });
  };

  return (
    <div className="flex" data-testid="homecontent-container">
      <div
        className={`transition-width duration-300 ${infoPanelVisibility ? 'w-2/3' : 'w-full'}`}
        data-testid="homecontent-panel-container"
        onClick={handleContainerClick}
      >
        <SearchBar searchTerm={searchTerm} onSearch={onSearch} />
        <SearchResults searchTerm={searchTerm} data={charactersData} />
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
