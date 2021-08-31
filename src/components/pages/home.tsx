import { FC, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore';
import SearchBar from '../shared/searchBar';
import TableHead from '../shared/tableHead';
import { Item } from '../../../public/types';
import TableBody from '../shared/tableBody';
import { itemsData, loading } from '../../reducers/APIItemsSlice';
import { APIAsyncFunction } from '../../utils/api';
import { setPage, setPageLimit, setTotalPages } from '../../reducers/searchSlice';

const Home: FC = (): JSX.Element => {
  const search = useSelector((state: RootState) => state.search);
  const items = useSelector((state: RootState) => state.APIItems);
  const dispatch = useDispatch();


  const options = () => {
    const optionsArray = [];
    for (let i = 0; i < search.totalPages; i++) {
      const option = (
        <option key={i} value={i + 1}>
          {i + 1}
        </option>
      );
      optionsArray.push(option);
    }
    return optionsArray;
  };

  useEffect(() => {
    if (search.searchState.text === '') {
      dispatch(itemsData([]));
      dispatch(setTotalPages(0));
      return;
    }
    dispatch(loading(true));
    dispatch(APIAsyncFunction(search.searchState));
  }, [search.searchState]);

  function changeState(event: ChangeEvent<HTMLSelectElement>): void {
    const input = event.target;
    if (input.name === 'page'){
      dispatch(setPage(input.value));
    } else {
      dispatch(setPageLimit(input.value));
    }
  }

  return (
    <div className="main">
      <SearchBar />
      <div className="table">
        <TableHead />
        {items.loading ? (
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        ) : items.items.map((el: Item): JSX.Element => {
            return <TableBody key={el.publishedAt} item={el} name={search.searchState.text}/>;
          })}
      </div>
      <div className="pagination">
        <label className="pagination__label" htmlFor="amount">
          Pages on page:{' '}
        </label>
        <select
          className="pagination__pages-amount"
          id="amount"
          value={search.searchState.pageLimit}
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
          value={search.searchState.page}
          name="page"
          onChange={changeState}
        >
          {options()};
        </select>
        <span className="pagination__all-pages">Total pages: {search.totalPages}</span>
      </div>
    </div>
  );
};

export default Home;
