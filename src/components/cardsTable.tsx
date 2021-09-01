import { FC } from 'react';
import { Item } from '../../public/types';
import Card from './card';

interface CardsTableProps {
  items: Array<Item>;
}

const CardsTable: FC<CardsTableProps> = ({ items }): JSX.Element => {
  const cardsArray = () => {
    const result = items.map((el) => {
      return <Card key={el.code} itemData={el} />;
    });
    return result;
  };
  return <div className="catalog">{cardsArray()};</div>;
};

export default CardsTable;
