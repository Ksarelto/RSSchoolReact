import { useRouteMatch, Redirect, Switch, Route } from 'react-router-dom';
import { FC } from 'react';
import ItemDiscription from './itemDiscription';

const Details: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:id`}>
        <ItemDiscription />
      </Route>
      <Route path={`${path}/*`} render={() => <Redirect to="/notFound" />} />
    </Switch>
  );
};

export default Details;
