import { Dispatch } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Articles, Item, State } from '../../public/types';
import { API } from './constants';
import { itemsData, loading } from '../reducers/APIItemsSlice';
import {
  itemData,
  loadingItem,
  redirectToNotFoundPage,
  setAllowRedirect,
} from '../reducers/APIItemSlice';
import { setTotalPages } from '../reducers/searchSlice';

const apiRequest = async (searchState: State): Promise<Articles> => {
  const response: AxiosResponse<Articles> = await axios.get('https://newsapi.org/v2/everything', {
    params: {
      q: searchState.text,
      sortBy: searchState.radio,
      pageSize: searchState.pageLimit,
      page: searchState.page,
      apiKey: API,
    },
  });
  return response.data;
};

export const APIAsyncFunction = (searchState: State) => {
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      const result = await apiRequest(searchState);
      const totalPagesOnPage = result.totalResults / searchState.pageLimit;
      dispatch(itemsData(result.articles));
      dispatch(setTotalPages(totalPagesOnPage));
      dispatch(loading(false));
    } catch (err) {
      console.log(err);
    }
  };
};
export const APIAsyncItemFunction = (searchState: State, published: string) => {
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      const result = await apiRequest(searchState);
      const article = result.articles.find((el: Item) => el.publishedAt === published);
      if (!article) {
        dispatch(setAllowRedirect(false));
        dispatch(redirectToNotFoundPage(true));
        return;
      }
      dispatch(itemData(article));
      dispatch(loadingItem(true));
    } catch (err) {
      console.log(err);
    }
  };
};
