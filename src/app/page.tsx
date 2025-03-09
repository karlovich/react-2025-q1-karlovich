import { HomeContent } from '../components/HomeContent/HomeContent';

async function getCharacters() {
  const res = await fetch(`https://swapi.dev/api/people/?search=&page=`);
  const posts = await res.json();
  return posts;
}

export default async function Page() {
  const recentPosts = await getCharacters();
  return <HomeContent charactersData={recentPosts} />;
}
