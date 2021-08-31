import { Switch, Route } from "react-router"
import { useRouteMatch, Redirect } from "react-router-dom";
import { NotFoundPage } from "./notFoundPage";
import { ItemDiscription } from "./itemDiscription";
export const Details =() => {
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
