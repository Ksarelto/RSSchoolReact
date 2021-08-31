import { useEffect, useState } from 'react';
import { SearchBar } from '../components/searchBar';
import { TableHead } from '../components/tableHead';
import { Item, Articles } from '../../public/types';
import { TableBody } from '../components/tableBody';
const API = 'e60b5635d25644f9bd31ee59009be1ac';
const initSearchState = { text: '', radio: 'revalency', pageLimit: 10, page: 1 };

export const Home = (): JSX.Element => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchState, setSearchState] = useState(initSearchState);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchAPI = async () => {
    setLoading(true);
    try {
      const response = fetch(
        `https://newsapi.org/v2/everything?q=${searchState.text}&sortBy=${searchState.radio}&pageSize=${searchState.pageLimit}&page=${searchState.page}&apiKey=${API}`,
      );
      const result: Promise<Articles> = (await response).json();
      const error = (await result).status;
      if (error === 'error') {
        alert((await result).message);
        return;
      }
      const { articles } = await result;
      const totalPagesOnPage = (await result).totalResults / searchState.pageLimit;
      setItems(articles);
      setTotalPages(Math.ceil(totalPagesOnPage));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const options = () => {
    const optionsArray = [];
    for (let i = 0; i < totalPages; i++) {
      const option = <option value={i + 1}>{i + 1}</option>;
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
          onChange={(e) =>
            setSearchState({ ...searchState, pageLimit: Number(e.target.value) })
          }
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
          onChange={(e) => setSearchState({ ...searchState, page: Number(e.target.value) })}
        >
          {options()};
        </select>
        <span className="pagination__all-pages">Total pages: {totalPages}</span>
      </div>
    </div>
  );
};
