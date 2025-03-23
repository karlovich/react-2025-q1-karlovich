import { useEffect, useState, useMemo, useCallback } from 'react';
import { Country } from '../../shared/types';
import { CountryCard } from '../CountryCard';
import React from 'react';

const MemoizedCountryCard = React.memo(CountryCard);
export const HomeContent = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCountryOption, setSortCountryOption] = useState('');
  const [region, setRegion] = useState('');

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

  useEffect(() => {}, [searchTerm, sortCountryOption, region]);

  const sortItems = (items: Country[], option: string) => {
    const sortedCountries = [...items];
    if (option === 'name-asc') {
      sortedCountries.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
    } else if (option === 'name-desc') {
      sortedCountries.sort((a, b) =>
        b.name.common.localeCompare(a.name.common)
      );
    }
    return sortedCountries;
  };

  const applyRegionFilter = (items: Country[], regionOption: string) => {
    return items.filter((country) => country.region === regionOption);
  };

  const applySearch = (items: Country[], search: string) => {
    return items.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
  };

  const renderedCountries = useMemo(() => {
    let updatedCountries = [...countries];

    if (searchTerm) {
      updatedCountries = applySearch(updatedCountries, searchTerm);
    }

    if (sortCountryOption) {
      updatedCountries = sortItems(updatedCountries, sortCountryOption);
    }
    if (region) {
      updatedCountries = applyRegionFilter(updatedCountries, region);
    }

    return updatedCountries;
  }, [searchTerm, sortCountryOption, region, countries]);

  const onSort = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCountryOption(e.target.value);
  }, []);

  const onChangeRegion = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRegion(e.target.value);
    },
    []
  );

  const onSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <>
      <h1 className="text-black text-xl font-bold ">
        Click to mark visited country. Filter&Sort options:
      </h1>
      <div className="flex space-x-4 p-4">
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
          value={sortCountryOption}
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
          return <MemoizedCountryCard key={country.cca3} country={country} />;
        })}
      </div>
    </>
  );
};
