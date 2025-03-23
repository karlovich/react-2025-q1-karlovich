import { useEffect, useState } from 'react';
import { Country } from '../../shared/types';
import { CountryCard } from '../CountryCard';

export const HomeContent = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [renderedCountries, setRenderedCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCountry, setSortCountry] = useState('');
  const [region, setRegion] = useState('');

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      if (!response.ok)
        throw new Error('Error occured when fetching countries');
      const data: Country[] = await response.json();
      setCountries(data);
      setRenderedCountries(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);

    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );

    setRenderedCountries(filtered);
  };

  const onSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOption = e.target.value;
    setSortCountry(sortOption);

    let sortedCountries = [...renderedCountries];

    if (sortOption === 'name-asc') {
      sortedCountries.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
    } else if (sortOption === 'name-desc') {
      sortedCountries.sort((a, b) =>
        b.name.common.localeCompare(a.name.common)
      );
    } else {
      sortedCountries = [...countries];
    }

    setRenderedCountries(sortedCountries);
  };

  const onChangeRegion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const region = e.target.value;
    setRegion(region);

    if (region === '') {
      setRenderedCountries(countries);
    } else {
      const filtered = countries.filter((country) => country.region === region);
      setRenderedCountries(filtered);
    }
  };

  return (
    <>
      <div className="flex space-x-4">
        <input
          type="text"
          className="p-2 border border-gray-300 rounded"
          placeholder="Search by country name..."
          value={searchTerm}
          onChange={onSearch}
        />
        <select
          value={region}
          onChange={onChangeRegion}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Antarctic">Antarctic</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        <select
          value={sortCountry}
          onChange={onSort}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Name</option>
          <option value="name-asc">A-Z</option>
          <option value="name-desc">Z-A</option>
        </select>
      </div>
      <div className="countries-container">
        {renderedCountries.map((country) => {
          return (
            <CountryCard
              key={country.name.common + country.flags.png}
              country={country}
            />
          );
        })}
      </div>
    </>
  );
};
