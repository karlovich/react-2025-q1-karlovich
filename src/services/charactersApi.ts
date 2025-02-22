import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CharacterSearchResults, Character } from '../shared/types';

export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/people/' }),
  endpoints: (builder) => ({
    getCharacterById: builder.query<Character, string>({
      query: (id) => id,
    }),
    searchCharacters: builder.query<
      CharacterSearchResults,
      { searchTerm: string; page: string }
    >({
      query: ({ searchTerm, page }) => `?search=${searchTerm}&page=${page}`,
    }),
  }),
});

export const { useGetCharacterByIdQuery, useSearchCharactersQuery } =
  charactersApi;
