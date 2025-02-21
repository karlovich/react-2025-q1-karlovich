import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CardStoreState {
  characters: string[];
}

const initialState: CardStoreState = {
  characters: [],
};

export const cardStoreSlice = createSlice({
  name: 'cardStore',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.characters.push(action.payload);
    },
    remove: (state, action: PayloadAction<string>) => {
      state.characters.splice(state.characters.indexOf(action.payload), 1);
    },
    reset: () => {
      return initialState;
    },
  },
});

export const { add, remove, reset } = cardStoreSlice.actions;

export default cardStoreSlice.reducer;
