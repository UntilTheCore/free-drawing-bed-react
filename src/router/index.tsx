import React, { lazy } from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import NoMatch from "views/NoMatch";

const User = lazy(() => import('views/User'));
const About = lazy(() => import('views/About'));

const MyRouter: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact></Route>
      <Route path="/user" exact>
        <User />
      </Route>
      <Route path="/about" component={About} exact />
      <Route path="*" component={NoMatch}></Route>
    </Switch>
  );
};

export default MyRouter;