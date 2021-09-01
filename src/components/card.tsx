import { FC } from 'react';
import { Item } from '../../public/types';

interface CardProps {
  key: number;
  itemData: Item;
}

const Card: FC<CardProps> = ({ itemData }): JSX.Element => {
  return (
    <div className="card">
      <p className="card__name">{itemData.name}</p>
      <div className="card__image-wrapper">
        <img src={itemData.src} alt="image" className="card__image" />
      </div>
      <div className="side-btns">
        <input type="button" className="side-btns__like" />
        <input type="button" className="side-btns__view" />
      </div>
      <div className="card__discription">
        <p className="card__price">Цена: {itemData.price} p</p>
        <p className="card__price">Цвет: {itemData.color}</p>
        <p className="card__price">Тип: {itemData.gender}</p>
      </div>
      <input type="button" className="card__basket" value="В Корзину" name="basketbutton" />
    </div>
  );
};

export default Card;
