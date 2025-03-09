import { Character, CharacterSearchResults } from '@/shared/types';
import { HomeContent } from '../../../components/HomeContent/HomeContent';

async function getCharacters(page: string, search: string) {
  page = page ?? '1';
  search = search ?? '';
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

interface Props {
  params: { id: string };
  searchParams: { page: string; search: string };
}

export default async function Page({ params, searchParams }: Props) {
  const { id } = params;
  const { page, search } = searchParams;
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
