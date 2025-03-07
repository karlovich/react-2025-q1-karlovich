import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { Character, CharacterSearchResults } from '@/shared/types';
import { HomeContent } from '@/components/HomeContent/HomeContent';

export const getServerSideProps = (async (context) => {
  let id;
  let page = '1';
  let search = '';
  if (context.query && typeof context.query.id === 'string') {
    id = context.query.id;
  }
  if (context.query && typeof context.query.page === 'string') {
    page = context.query.page;
  }
  if (context.query && typeof context.query.search === 'string') {
    search = context.query.search;
  }
  const res1 = await fetch(
    `https://swapi.dev/api/people/?search=${search}&page=${page}`
  );
  const characters: CharacterSearchResults = await res1.json();
  const res2 = await fetch(`https://swapi.dev/api/people/${id}`);
  const character: Character = await res2.json();

  return { props: { characters, character } };
}) satisfies GetServerSideProps<{
  characters: CharacterSearchResults;
  character: Character;
}>;

export default function CharactersPanel({
  characters,
  character,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <HomeContent
      charactersData={characters}
      infoPanelVisibility
      character={character}
    />
  );
}
