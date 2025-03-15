import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TBD } from '../shared/types';

export interface FormStoreState {
  tbd: TBD[];
}

const initialState: FormStoreState = {
  tbd: [],
};

export const formStoreSlice = createSlice({
  name: 'formStore',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<TBD>) => {
      //TBD
      console.log(state, action);
    },
    remove: (state, action: PayloadAction<TBD>) => {
      //TBD
      console.log(state, action);
    },
    reset: () => {
      return initialState;
    },
  },
});

export const { add, remove, reset } = formStoreSlice.actions;

export default formStoreSlice.reducer;
