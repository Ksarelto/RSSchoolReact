import React from 'react';
import { NavLink } from 'react-router-dom';
import { Item } from '../../public/types';
import { ItemDiscription } from '../pages/itemDiscription';

export const TableBody = (props: { item: Item, name: string }): JSX.Element => {
  return (
    <div className="table__body">
      <NavLink to={`details/${props.name}&&${props.item.publishedAt}`} className="table__body-nav-link"/>
      <span className="table__body-span table__body-author">{props.item.author}</span>
      <span className="table__body-span table__body-tittle">{props.item.title}</span>
      <span className="table__body-span table__body-description">{props.item.description}</span>
      <div className="table__body-span table__body-image-wrapper">
        <img className="table__body-image" src={props.item.urlToImage} alt="image" />
      </div>
      <span className="table__body-span table__body-published">{props.item.publishedAt}</span>
      <span className="table__body-span table__body-content">{props.item.content}</span>
    </div>
  );
};
