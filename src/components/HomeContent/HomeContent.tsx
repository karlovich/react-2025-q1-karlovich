import { useEffect, useState } from 'react';
import { Country } from '../../shared/types';
import { CountryCard } from '../CountryCard';

export const HomeContent = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      if (!response.ok)
        throw new Error('Error occured when fetching countries');
      const data: Country[] = await response.json();
      setCountries(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="countries-container">
      {countries.map((country) => {
        return (
          <CountryCard
            key={country.name.common + country.flags.png}
            country={country}
          />
        );
      })}
    </div>
  );
};
