import { configureStore } from '@reduxjs/toolkit';
import cardStoreReducer from '../features/cardStoreSlice';
import { setupListeners } from '@reduxjs/toolkit/query/react';

export const store = configureStore({
  reducer: {
    cardStore: cardStoreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ReturnType<typeof store.dispatch>;

setupListeners(store.dispatch);
