import  React from 'react';
import { Switch, Route, NavLink, BrowserRouter as Router, useLocation, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { About } from './pages/about';
import { NotFoundPage } from './pages/notFoundPage';
import { Home } from './pages/home';
import '../public/normolize.css';
import '../public/style.scss';
import '../public/media.scss';
import { Details } from './pages/details';

export const App = (): JSX.Element => {
  let location  = useLocation();
  return (
      <div className="wrapper">
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__list-li">
              <NavLink className="nav__link" activeClassName="nav__link_active" exact to="/">Home</NavLink>
            </li>
            <li className="nav__list-li">
              <NavLink className="nav__link" activeClassName="nav__link_active" to="/about">About</NavLink>
            </li>
          </ul>
        </nav>

       <TransitionGroup>
         <CSSTransition key={location.key} classNames="page" timeout={900}>
          <Switch location={location}>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/details" >
              < Details />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/notFound" >
              <NotFoundPage />
            </Route>
            <Route path="*" render={() => (<Redirect to="/notFound" />)} />
          </Switch>
         </CSSTransition>
       </TransitionGroup>
      </div>
  )
}
