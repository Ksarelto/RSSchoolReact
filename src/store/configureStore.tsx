import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../reducers/searchSlice';
import APIItemsReducer from '../reducers/APIItemsSlice';
import APIItemReducer from '../reducers/APIItemSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    APIItems: APIItemsReducer,
    APIItem: APIItemReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
