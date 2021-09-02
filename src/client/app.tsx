import React, { FC } from 'react';
import { Switch, Route, NavLink, useLocation, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import About from './components/pages/aboutPage';
import NotFoundPage from './components/pages/notFoundPage';
import Home from './components/pages/home';
import '../../public/normolize.css';
import '../../public/style.scss';
import '../../public/media.scss';
import Details from './components/pages/details';

const App: FC = (): JSX.Element => {
  const location = useLocation();
  return (
    <div className="wrapper">
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__list-li">
            <NavLink className="nav__link" activeClassName="nav__link_active" exact to="/">
              Home
            </NavLink>
          </li>
          <li className="nav__list-li">
            <NavLink className="nav__link" activeClassName="nav__link_active" to="/about">
              About
            </NavLink>
          </li>
        </ul>
      </nav>

      <TransitionGroup>
        <CSSTransition key={location.key} classNames="page" timeout={900}>
          <Switch location={location}>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/details">
              <Details />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/notFound">
              <NotFoundPage />
            </Route>
            <Route path="*" render={() => <Redirect to="/notFound" />} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default App;
