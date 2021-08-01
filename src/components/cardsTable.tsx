import React from 'react';
import { Item } from '../../public/types';
import { Card } from './card';

const CardsTable = (props: { items: Array<Item> }): JSX.Element => {
  const cardsArray = () => {
    const result = props.items.map((el) => {
      return <Card key={el.code} itemData={el} />;
    });
    return result;
  };
  return <div className="catalog">{cardsArray()};</div>;
};

export default CardsTable;
