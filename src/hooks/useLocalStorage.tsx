import { useState } from 'react';
import { LocalStorageService } from '../services/LocalStorageService';
import { LOCAL_STORAGE_KEYS } from '../shared/constants';

export const useLocalStorage = () => {
  const [searchTerm, setSearchTerm] = useState(() => {
    return LocalStorageService.get(LOCAL_STORAGE_KEYS.SEARCH_TERM) || '';
  });

  const setSearchTermToLS = (text: string) => {
    setSearchTerm(text);
    LocalStorageService.set(LOCAL_STORAGE_KEYS.SEARCH_TERM, text);
  };

  return [searchTerm, setSearchTermToLS] as const;
};
