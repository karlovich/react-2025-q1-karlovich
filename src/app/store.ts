import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import formStoreReducer from '../features/formStoreSlice';

export const store = configureStore({
  reducer: {
    formStore: formStoreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ReturnType<typeof store.dispatch>;

setupListeners(store.dispatch);
