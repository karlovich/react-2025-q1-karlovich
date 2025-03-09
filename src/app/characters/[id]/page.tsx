import { Character, CharacterSearchResults } from '@/shared/types';
import { HomeContent } from '../../../components/HomeContent/HomeContent';

async function getCharacters(page: string, search: string) {
  const res = await fetch(
    `https://swapi.dev/api/people/?search=${search}&page=${page}`
  );
  const characters: CharacterSearchResults = await res.json();
  return characters;
}

async function getCharacterById(id: string) {
  const res = await fetch(`https://swapi.dev/api/people/${id}`);
  const character: Character = await res.json();
  return character;
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { id } = await params;
  const { page = '1', search = '' } = await searchParams;
  const characters = await getCharacters(page, search);
  const character = await getCharacterById(id);
  return (
    <HomeContent
      charactersData={characters}
      character={character}
      infoPanelVisibility
    />
  );
}
