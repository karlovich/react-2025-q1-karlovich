import { Country } from '../shared/types';

interface Props {
  country: Country;
}
export const CountryCard = ({ country }: Props) => {
  return (
    <div className="countries-instance">
      <img src={country.flags.png} />
      <span>{country.name.common}</span>
      <span>{country.region}</span>
      <span>{country.population}</span>
      <span>Capital: {country.capital ? country.capital[0] : 'Unknown'}</span>
    </div>
  );
};
