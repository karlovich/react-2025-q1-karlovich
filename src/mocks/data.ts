import { Character, CharacterSearchResults } from '../shared/types';

export const mockedCharacterId1: Character = {
  name: 'Luke Skywalker',
  gender: 'male',
  url: 'https://swapi.dev/api/people/1/',
  birth_year: '19BBY',
  height: 172,
  mass: 77,
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'n/a',
};

export const mockCharacters: Character[] = [
  {
    name: 'Luke Skywalker',
    gender: 'male',
    url: 'https://swapi.dev/api/people/1/',
    birth_year: '19BBY',
    height: 172,
    mass: 77,
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'n/a',
  },
  {
    name: 'Darth Vader',
    gender: 'male',
    url: 'https://swapi.dev/api/people/4/',
    birth_year: '41.9BBY',
    height: 202,
    mass: 136,
    hair_color: 'none',
    skin_color: 'white',
    eye_color: 'yellow',
  },
];

export const mockResponseForLuke: CharacterSearchResults = {
  count: 2,
  next: null,
  previous: null,
  results: mockCharacters,
};

export const mockEmptyResponse: CharacterSearchResults = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};
