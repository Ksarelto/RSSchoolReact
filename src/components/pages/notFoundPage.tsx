import { FC } from 'react';

const NotFoundPage: FC = (): JSX.Element => {
  return (
    <div className="notFound">
      <p className="notFound__text">
        Sorry, but this page is not exist/ Try to return to
        <span className="notFound__span">Home</span> or
        <span className="notFound__span">About</span> pages
      </p>
    </div>
  );
};

export default NotFoundPage;
