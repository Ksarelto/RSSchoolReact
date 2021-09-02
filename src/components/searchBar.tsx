import { FC } from 'react';

const SearchBar: FC = (): JSX.Element => {
  return (
    <div className="search">
      <form className="search__form">
        <div className="search__inputs-wrapper">
          <input className="search__text" type="text" name="text" placeholder="&#128270;" />
          <input className="search__button" type="button" name="button" value="Search" />
        </div>
        <div className="search__checkbox-wrapper">
          <div>
            <input className="search__checkbox" id="google" type="radio" name="search" />
            <label className="search__label" htmlFor="google">
              search in Google
            </label>
          </div>
          <div>
            <input className="search__checkbox" id="yandex" type="radio" name="search" />
            <label className="search__label" htmlFor="yandex">
              search in Yandex
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
