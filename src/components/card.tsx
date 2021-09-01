import { FC } from 'react';
import { Item } from '../../public/types';

interface CardProps {
  data: Item;
}

const Card: FC<CardProps> = ({ data }): JSX.Element => {
  return (
    <div className="card">
      <p className="card__text">
        Name:
        <span className="card__value">{data.nameInput}</span>
      </p>
      <p className="card__text">
        Lastname:
        <span className="card__value">{data.lastnameInput}</span>
      </p>
      <p className="card__text">
        Zip code:
        <span className="card__value">{data.zipcodeInput}</span>
      </p>
      <p className="card__text">
        Birth date:
        <span className="card__value">{data.birthInput}</span>
      </p>
      <p className="card__text">
        Country:
        <span className="card__value">{data.countryInput}</span>
      </p>
      <p className="card__text">
        Agreement:
        <span className="card__value">{data.agreementInput ? 'Agree' : 'Error'}</span>
      </p>
      <p className="card__text">
        Gender:
        <span className="card__value">{data.genderInput ? 'Men' : 'Women'}</span>
      </p>
    </div>
  );
};

export default Card;
