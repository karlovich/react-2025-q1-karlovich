import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../shared/types';

export interface CardStoreState {
  characters: Character[];
}

const initialState: CardStoreState = {
  characters: [],
};

export const cardStoreSlice = createSlice({
  name: 'cardStore',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Character>) => {
      if (
        state.characters.find(
          (character) => character.url === action.payload.url
        ) === undefined
      ) {
        state.characters.push(action.payload);
      }
    },
    remove: (state, action: PayloadAction<Character>) => {
      state.characters = state.characters.filter(
        (character) => character.url !== action.payload.url
      );
    },
    reset: () => {
      return initialState;
    },
  },
});

export const { add, remove, reset } = cardStoreSlice.actions;

export default cardStoreSlice.reducer;
