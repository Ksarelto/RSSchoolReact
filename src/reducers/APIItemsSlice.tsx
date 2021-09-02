import { createSlice } from '@reduxjs/toolkit';

export const APIItemsSlice = createSlice({
  name: 'API',
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    itemsData: (state, action) => {
      state.items = action.payload;
    },
    loading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { itemsData, loading } = APIItemsSlice.actions;
export default APIItemsSlice.reducer;
