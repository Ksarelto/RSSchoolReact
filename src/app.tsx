import { FC, useState } from 'react';
import '../public/normolize.css';
import '../public/style.scss';
import '../public/media.scss';
import SubmitForm from './components/form';
import Card from './components/card';
import { Item } from '../public/types';

const App: FC = (): JSX.Element => {
  const [cards, setCards] = useState<Item[]>([]);
  return (
    <div className="main">
      <SubmitForm getCardData={setCards} />
      <div className="cards-wrapper">
        {cards.map((el, ind) => (
          <Card key={ind} data={el} />
        ))}
      </div>
    </div>
  );
};

export default App;
