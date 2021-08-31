import React, { useState, MouseEvent, ChangeEvent } from 'react';

interface Search {
  text: string;
  radio: string;
  pageLimit: number;
  page: number;
}

export const SearchBar = (props: { getSearchData: (arg0: Search) => void }): JSX.Element => {
  const [search, setSearch] = useState({ text: '', radio: '' });
  const clickedRadio = (event: MouseEvent) => {
    const targetValue = (event.target as HTMLInputElement).value;
    setSearch((prev) => ({ ...prev, radio: targetValue }));
  };
  const sendSearchForm = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.getSearchData((prev) => ({...prev, text: search.text, radio: search.radio, page: 1 }));
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
          <label className="search__label" htmlFor="revalence">
            Revalency
          </label>
          <input
            className="search__radio"
            type="radio"
            name="sort"
            id="revalence"
            value="relevancy"
            onClick={clickedRadio}
          />
          <label className="search__label" htmlFor="popular">
            Popularity
          </label>
          <input
            className="search__radio"
            type="radio"
            name="sort"
            id="popular"
            value="popularity"
            onClick={clickedRadio}
          />
          <label className="search__label" htmlFor="publish">
            Published At
          </label>
          <input
            className="search__radio"
            type="radio"
            name="sort"
            id="publish"
            value="publishedAt"
            onClick={clickedRadio}
          />
        </div>
      </form>
    </div>
  );
};
