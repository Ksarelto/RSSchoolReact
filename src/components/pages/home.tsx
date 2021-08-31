import { FC, useEffect, useState, ChangeEvent } from 'react';
import axios from '../../utils/api';
import { AxiosResponse } from 'axios';
import  SearchBar  from '../shared/searchBar';
import  TableHead  from '../shared/tableHead';
import { Item, Articles, Search } from '../../../public/types';
import  TableBody  from '../shared/tableBody';
import { API, InitSearchState } from '../../utils/constants';

const Home: FC = (): JSX.Element => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchState, setSearchState] = useState<Search>(InitSearchState);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchAPI = async () => {
    setLoading(true);
    try {
      const response: AxiosResponse<Articles> = await axios.get('/everything', {
        params: {
          q: searchState.text,
          sortBy: searchState.radio,
          pageSize: searchState.pageLimit,
          page: searchState.page,
          apiKey: API,
        },
      });
      const result: Articles = response.data;
      const { articles } = result;
      const totalPagesOnPage = result.totalResults / searchState.pageLimit;
      setItems(articles);
      setTotalPages(Math.ceil(totalPagesOnPage));
    } catch (err) {
      const response = err.response.data;
      if (response.status === 'error'){
        alert(response.message)
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const options = () => {
    const optionsArray = [];
    for (let i = 0; i < totalPages; i++) {
      const option = <option key={i} value={i + 1}>{i + 1}</option>;
      optionsArray.push(option);
    }
    return optionsArray;
  };

  useEffect(() => {
    if (searchState.text === '') {
      setItems([]);
      setTotalPages(1);
      return;
    }
    fetchAPI();
  }, [searchState]);

  function changeState(event: ChangeEvent<HTMLSelectElement>): void {
    const input = event.target;
    setSearchState({ ...searchState, [input.name]: input.value });
  }

  return (
    <div className="main">
      <SearchBar getSearchData={setSearchState} />
      <div className="table">
        <TableHead />
        {loading
          ? <div className="lds-ripple"><div></div><div></div></div>
          : items.map((el: Item): JSX.Element => {
            return <TableBody item={el} name={searchState.text}/>;
          })}
      </div>
      <div className="pagination">
        <label className="pagination__label" htmlFor="amount">
          Pages on page:{' '}
        </label>
        <select
          className="pagination__pages-amount"
          id="amount"
          value={searchState.pageLimit}
          name="pageLimit"
          onChange={changeState}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
        <label className="pagination__label" htmlFor="number">
          Page:{' '}
        </label>
        <select
          className="pagination__page-number"
          id="number"
          value={searchState.page}
          name="page"
          onChange={changeState}
        >
          {options()};
        </select>
        <span className="pagination__all-pages">Total pages: {totalPages}</span>
      </div>
    </div>
  );
};

export default Home;
