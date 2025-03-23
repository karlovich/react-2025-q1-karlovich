import { useState } from 'react';
import { LocalStorageService } from '../services/LocalStorageService';
import { LOCAL_STORAGE_KEYS } from '../shared/constants';

export const useLocalStorage = (): [
  string[],
  (countries: string[]) => void,
] => {
  const [visitedCountries, setVisitedCountries] = useState<string[]>(() => {
    const countriesInLS = LocalStorageService.get(
      LOCAL_STORAGE_KEYS.VISITED_COUNTRIES
    );
    if (countriesInLS) {
      return JSON.parse(countriesInLS);
    } else {
      return [];
    }
  });

  const setVisitedCountriesToLS = (countries: string[]) => {
    setVisitedCountries(countries);
    LocalStorageService.set(
      LOCAL_STORAGE_KEYS.VISITED_COUNTRIES,
      JSON.stringify(countries)
    );
  };

  return [visitedCountries, setVisitedCountriesToLS];
};
