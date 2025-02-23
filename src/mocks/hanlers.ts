import { http, HttpResponse } from 'msw';
import { Character } from '../shared/types';

const mockedCharacterId1: Character = {
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

export const handlers = [
  http.get('https://swapi.dev/api/people/1', () => {
    return HttpResponse.json(mockedCharacterId1);
  }),
];
