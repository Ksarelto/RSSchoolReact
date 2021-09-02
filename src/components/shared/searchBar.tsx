import React, { ChangeEvent, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addInputsStateToSearch, setInputState } from '../../reducers/searchSlice';
import { RootState } from '../../store/configureStore';

const SearchBar: FC = (): JSX.Element => {
  const inputsData = useSelector((state: RootState) => state.search.inputsState);
  const dispatch = useDispatch();

  const radioBtns = [
    { key: 1, value: 'relevancy' },
    { key: 2, value: 'popularity' },
    { key: 3, value: 'publishedAt' },
  ];

  const changeSearchState = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    dispatch(setInputState({ ...inputsData, [input.type]: input.value }));
  };

  const sendSearchForm = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addInputsStateToSearch(inputsData));
  };
  return (
    <div className="search">
      <form className="search__form" onSubmit={sendSearchForm}>
        <div className="search__search-input-wrapper">
          <input
            className="search__text"
            type="text"
            name="search"
            placeholder="Search..."
            value={inputsData.text}
            onChange={changeSearchState}
          />
          <input className="search__btn" type="submit" name="submit" value="&#128269;" />
        </div>
        <div className="search__sort-inputs-wrapper">
          <p className="search__sort-text">Sort By: </p>
          {radioBtns.map((el) => {
            return (
              <React.Fragment key={el.key}>
                <label className="search__label" htmlFor={el.value}>
                  {el.value}
                </label>
                <input
                  className="search__radio"
                  type="radio"
                  name="sort"
                  id={el.value}
                  value={el.value}
                  onChange={changeSearchState}
                />
              </React.Fragment>
            );
          })}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
