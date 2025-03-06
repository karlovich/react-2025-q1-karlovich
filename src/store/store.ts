import { configureStore } from '@reduxjs/toolkit';
import cardStoreReducer from '../features/cardStoreSlice';
import { charactersApi } from '../services/charactersApi';
import { setupListeners } from '@reduxjs/toolkit/query/react';

export const store = configureStore({
  reducer: {
    cardStore: cardStoreReducer,
    [charactersApi.reducerPath]: charactersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(charactersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ReturnType<typeof store.dispatch>;

setupListeners(store.dispatch);
