'use client';
import { useState } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { useTheme } from '../../context/ThemeContext';
import { InfoPanel } from '../InfoPanel/InfoPanel';
import { Character, CharacterSearchResults } from '@/shared/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('search') ?? ''
  );
  const { theme } = useTheme();
  const onSearch = (text: string) => {
    setSearchTerm(text);
    const params = new URLSearchParams(searchParams.toString());
    params.set('search', text);
    params.set('page', '1');
    router.push(pathname + '?' + params.toString());
  };

  const handleContainerClick = () => {
    router.push('/' + '?' + searchParams.toString());
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
