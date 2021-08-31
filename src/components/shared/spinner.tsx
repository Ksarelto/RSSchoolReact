import { FC } from 'react';

const Spinner: FC = (): JSX.Element => {
  return (
    <div className="lds-ripple" data-testid="ripple">
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
