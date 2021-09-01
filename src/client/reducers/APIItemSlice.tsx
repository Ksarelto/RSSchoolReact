import { createSlice } from '@reduxjs/toolkit';
import { Item } from '../../../public/types';

export const APIItemSlice = createSlice({
  name: 'API',
  initialState: {
    item: {} as Item,
    loading: false,
    redirect: false,
    allowRedirect: true,
  },
  reducers: {
    itemData: (state, action) => {
      state.item = action.payload;
    },
    loadingItem: (state, action) => {
      state.loading = action.payload;
    },
    redirectToNotFoundPage: (state, action) => {
      state.redirect = action.payload;
    },
    setAllowRedirect: (state, action) => {
      state.allowRedirect = action.payload;
    },
  },
});

export const { itemData, loadingItem, redirectToNotFoundPage, setAllowRedirect } =
  APIItemSlice.actions;
export default APIItemSlice.reducer;
