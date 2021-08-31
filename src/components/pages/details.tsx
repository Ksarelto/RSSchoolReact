import { Switch, Route } from "react-router"
import { useRouteMatch, Redirect } from "react-router-dom";
import { ItemDiscription } from "./itemDiscription";
import { FC } from "react";

const Details: FC =() => {
  const { path } = useRouteMatch();

  return (
    <Switch>
          <Route path={`${path}/:id`}>
            <ItemDiscription />
          </Route>
          <Route path={`${path}/*`} render={() => (<Redirect to="/notFound" />)} />
        </Switch>
  )
}

export default Details;

