import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "views/Home";
import NoMatch from "views/NoMatch";

const History = lazy(() => import("views/History"));
const About = lazy(() => import("views/About"));
const Login = lazy(() => import("views/Login"));
const Register = lazy(() => import("views/Register"));

const MyRouter: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/history" component={History} exact />
      <Route path="/about" component={About} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/register" component={Register} exact />

      <Route path="*" component={NoMatch}></Route>
    </Switch>
  );
};

export default MyRouter;
