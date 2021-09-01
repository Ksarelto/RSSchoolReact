import React, { useState, MouseEvent, ChangeEvent, FC } from 'react';
import { Search } from '../../public/types';

interface SearchFormProps {
  getSearchData: React.Dispatch<React.SetStateAction<Search>>;
}

const SearchBar: FC<SearchFormProps> = ({ getSearchData }): JSX.Element => {
  const [search, setSearch] = useState({ text: '', radio: '' });

  const radioBtns = [
    { key: 1, value: 'relevancy' },
    { key: 2, value: 'popularity' },
    { key: 3, value: 'publishedAt' },
  ];

  const clickedRadio = (event: MouseEvent) => {
    const targetValue = (event.target as HTMLInputElement).value;
    setSearch((prev) => ({ ...prev, radio: targetValue }));
  };

  const sendSearchForm = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    getSearchData((prev) => ({ ...prev, text: search.text, radio: search.radio, page: 1 }));
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
            value={search.text}
            onChange={(e) => setSearch({ ...search, text: e.target.value })}
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
                  onClick={clickedRadio}
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
