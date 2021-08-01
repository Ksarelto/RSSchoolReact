import React from 'react';
import { Item } from '../../public/types';

export const Card = (props: { key: number; itemData: Item }): JSX.Element => {
  return (
    <div className="card">
      <p className="card__name">{props.itemData.name}</p>
      <div className="card__image-wrapper">
        <img src={props.itemData.src} alt="image" className="card__image" />
      </div>
      <div className="side-btns">
        <input type="button" className="side-btns__like" />
        <input type="button" className="side-btns__view" />
      </div>
      <div className="card__discription">
        <p className="card__price">Цена: {props.itemData.price} p</p>
        <p className="card__price">Цвет: {props.itemData.color}</p>
        <p className="card__price">Тип: {props.itemData.gender}</p>
      </div>
      <input type="button" className="card__basket" value="В Корзину" name="basketbutton" />
    </div>
  );
};
