import { HomeContent } from '../components/HomeContent/HomeContent';

async function getCharacters(page: string, search: string) {
  const res = await fetch(
    `https://swapi.dev/api/people/?search=${search}&page=${page}`
  );
  const characters = await res.json();
  return characters;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page = '1', search = '' } = await searchParams;

  const characters = await getCharacters(page, search);
  return <HomeContent charactersData={characters} />;
}
