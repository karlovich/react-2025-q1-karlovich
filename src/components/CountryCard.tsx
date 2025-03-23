import { useLocalStorage } from '../hooks/useLocalStorage';
import { Country } from '../shared/types';

interface Props {
  country: Country;
}
export const CountryCard = ({ country }: Props) => {
  const [visitedCountries, setVisitedCountries] = useLocalStorage();
  const onClick = () => {
    console.log('isVisited', isVisited);
    if (isVisited) {
      setVisitedCountries(
        visitedCountries.filter((cca3) => cca3 !== country.cca3)
      );
    } else {
      setVisitedCountries([...visitedCountries, country.cca3]);
    }
  };

  const isVisited = visitedCountries.indexOf(country.cca3) !== -1;

  return (
    <div
      className={`countries-instance cursor-pointer  ${isVisited ? 'bg-lime-500' : 'hover:bg-cyan-400'} `}
      onClick={onClick}
    >
      <img src={country.flags.png} />
      <span>- this is {country.name.common}</span>
      <span>from {country.region}</span>
      <span>having population: {country.population}</span>
      <span>
        and capital: {country.capital ? country.capital[0] : 'Unknown'}
      </span>
    </div>
  );
};
