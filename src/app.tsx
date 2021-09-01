import { FC } from 'react';
import SearchBar from './components/searchBar';
import CardsTable from './components/cardsTable';
import { Item } from '../public/types';
import data from '../public/items';
import '../public/normolize.css';
import '../public/style.scss';
import '../public/media.scss';

const App: FC = (): JSX.Element => {
  const itemsData = data as Array<Item>;
  return (
    <div className="main">
      <SearchBar />
      <CardsTable items={itemsData} />
    </div>
  );
};

export default App;
