import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../shared/types';

export interface FormStoreState {
  userHookForm: User | null;
  userUncontrolledForm: User | null;
}

const initialState: FormStoreState = {
  userHookForm: null,
  userUncontrolledForm: null,
};

export const formStoreSlice = createSlice({
  name: 'formStore',
  initialState,
  reducers: {
    setHookFormData: (state, action: PayloadAction<User>) => {
      state.userHookForm = action.payload;
      console.log(state, action);
    },
    setUncontrolledFormData: (state, action: PayloadAction<User>) => {
      state.userUncontrolledForm = action.payload;
      console.log(state, action);
    },
    reset: () => {
      return initialState;
    },
  },
});

export const { setHookFormData, setUncontrolledFormData, reset } =
  formStoreSlice.actions;

export default formStoreSlice.reducer;
