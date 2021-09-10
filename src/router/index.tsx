import {
  Switch,
  Route
} from "react-router-dom";
import NoMatch from "views/NoMatch";

const MyRouter: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact></Route>
      <Route path="/home" exact>
        <div>home</div>
      </Route>
      <Route path="/about" exact>
        <div>about</div>
      </Route>
      <Route path="*" component={NoMatch}></Route>
    </Switch>
  );
};

export default MyRouter;