import React from 'react';
import { Item } from '../../public/types';

export const Card = (props: { key: number; data: Item }): JSX.Element => {
  return (
    <div className="card">
      <p className="card__text">
        Name:
        <span className="card__value">{props.data.nameInput}</span>
      </p>
      <p className="card__text">
        Lastname:
        <span className="card__value">{props.data.lastnameInput}</span>
      </p>
      <p className="card__text">
        Zip code:
        <span className="card__value">{props.data.zipcodeInput}</span>
      </p>
      <p className="card__text">
        Birth date:
        <span className="card__value">{props.data.birthInput}</span>
      </p>
      <p className="card__text">
        Country:
        <span className="card__value">{props.data.countryInput}</span>
      </p>
      <p className="card__text">
        Agreement:
        <span className="card__value">{props.data.agreementInput ? 'Agree' : 'Error'}</span>
      </p>
      <p className="card__text">
        Gender:
        <span className="card__value">{props.data.gender ? 'Men' : 'Women'}</span>
      </p>
    </div>
  );
};
