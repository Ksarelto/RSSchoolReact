import React from 'react';
import { Item } from '../../public/types';

export const TableBody = (props: { item: Item }): JSX.Element => {
  return (
    <div className="table__body">
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
