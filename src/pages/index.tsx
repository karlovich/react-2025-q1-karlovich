import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { CharacterSearchResults } from '@/shared/types';
import { HomeContent } from '@/components/HomeContent/HomeContent';

export const getServerSideProps = (async (context) => {
  let page = '1';
  let search = '';
  if (context.query && typeof context.query.page === 'string') {
    page = context.query.page;
  }
  if (context.query && typeof context.query.search === 'string') {
    search = context.query.search;
  }
  const res = await fetch(
    `https://swapi.dev/api/people/?search=${search}&page=${page}`
  );
  const characters: CharacterSearchResults = await res.json();
  return { props: { characters } };
}) satisfies GetServerSideProps<{ characters: CharacterSearchResults }>;

export default function Home({
  characters,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <HomeContent charactersData={characters} />;
}
