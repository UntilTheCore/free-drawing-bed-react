import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "views/Home";
import NoMatch from "views/NoMatch";

const User = lazy(() => import("views/User"));
const About = lazy(() => import("views/About"));
const Login = lazy(() => import("views/Login"));
const Register = lazy(() => import("views/Register"));

const MyRouter: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact></Route>
      <Route path="/user" exact>
        <User />
      </Route>
      <Route path="/about" component={About} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/register" component={Register} exact />

      <Route path="*" component={NoMatch}></Route>
    </Switch>
  );
};

export default MyRouter;
