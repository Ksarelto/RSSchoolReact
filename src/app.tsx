import { useState } from 'react';
import '../public/normolize.css';
import '../public/style.scss';
import '../public/media.scss';
import SubmitForm from './components/form';
import { Card } from './components/card';

export const App = (): JSX.Element => {
  const [cards, setCards] = useState([]);
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
