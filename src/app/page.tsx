import { HomeContent } from '../components/HomeContent/HomeContent';

async function getCharacters(page: string, search: string) {
  page = page ?? '1';
  search = search ?? '';
  const res = await fetch(
    `https://swapi.dev/api/people/?search=${search}&page=${page}`
  );
  const characters = await res.json();
  return characters;
}

interface Props {
  searchParams: { page: string; search: string };
}

export default async function Page({ searchParams }: Props) {
  const { page, search } = searchParams;

  const characters = await getCharacters(page, search);
  return <HomeContent charactersData={characters} />;
}
