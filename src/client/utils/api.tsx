import { Dispatch } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Articles, Item, State } from '../../../public/types';
import { API } from './constants';
import { itemsData, loading } from '../reducers/APIItemsSlice';
import {
  itemData,
  loadingItem,
  redirectToNotFoundPage,
  setAllowRedirect,
} from '../reducers/APIItemSlice';
import { setTotalPages } from '../reducers/searchSlice';

export const APIAsyncFunction = (searchState: State) => {
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      const response: AxiosResponse<Articles> = await axios.get(
        'https://newsapi.org/v2/everything',
        {
          params: {
            q: searchState.text,
            sortBy: searchState.radio,
            pageSize: searchState.pageLimit,
            page: searchState.page,
            apiKey: API,
          },
        },
      );
      const result = response.data;
      const totalPagesOnPage = result.totalResults / searchState.pageLimit;
      dispatch(itemsData(result.articles));
      dispatch(setTotalPages(totalPagesOnPage));
    } catch (err) {
      const res = err.response ? err.response : '';
      if (res.status >= 400) {
        alert(res.data.message);
        return;
      }
      console.log(err);
    } finally {
      dispatch(loading(false));
    }
  };
};
export const APIAsyncItemFunction = (searchState: State, published: string) => {
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      const response: AxiosResponse<Articles> = await axios.get(
        'https://newsapi.org/v2/everything',
        {
          params: { q: searchState.text, from: published, to: published, apiKey: API },
        },
      );
      const result = response.data;
      const article = result.articles.find((el: Item) => el.publishedAt === published);
      if (!article) {
        dispatch(setAllowRedirect(false));
        dispatch(redirectToNotFoundPage(true));
        return;
      }
      dispatch(itemData(article));
      dispatch(loadingItem(true));
    } catch (err) {
      const res = err.response ? err.response : '';
      if (res.status >= 400) {
        alert(res.data.message);
        dispatch(setAllowRedirect(false));
        dispatch(redirectToNotFoundPage(true));
      }
      console.log(err);
    }
  };
};
