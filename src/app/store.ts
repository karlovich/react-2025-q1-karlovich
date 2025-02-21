import { configureStore } from '@reduxjs/toolkit';
import cardStoreReducer from '../features/cardStoreSlice';

export const store = configureStore({
  reducer: { cardStore: cardStoreReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ReturnType<typeof store.dispatch>;
