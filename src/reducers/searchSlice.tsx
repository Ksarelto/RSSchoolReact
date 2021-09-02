import { createSlice } from '@reduxjs/toolkit';

export const SearchSlice = createSlice({
  name: 'Search',
  initialState: {
    searchState: { text: '', radio: 'revalency', pageLimit: 10, page: 1 },
    inputsState: { text: '', radio: '' },
    totalPages: 0,
    loading: false,
  },
  reducers: {
    setRadio: (state, action) => {
      state.searchState.radio = action.payload;
    },
    addInputsStateToSearch: (state, action) => {
      state.searchState = {
        ...state.searchState,
        text: action.payload.text,
        radio: action.payload.radio,
      };
    },
    setInputState: (state, action) => {
      state.inputsState = action.payload;
    },
    setPageLimit: (state, action) => {
      state.searchState.pageLimit = Number(action.payload);
    },
    setPage: (state, action) => {
      state.searchState.page = Number(action.payload);
    },
    setTotalPages: (state, action) => {
      state.totalPages = Number(action.payload);
    },
    setLoading: (state) => {
      state.loading = !state.loading;
    },
  },
});

export const {
  setRadio,
  setInputState,
  setPageLimit,
  setPage,
  setTotalPages,
  setLoading,
  addInputsStateToSearch,
} = SearchSlice.actions;
export default SearchSlice.reducer;
