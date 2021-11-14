import routerMap from "./router";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Router = () => {
  return (
    <Switch>
      {routerMap.map(({ path, component }) => {
        return (
          <Route exact key={path} path={path} component={component} />
        );
      })}
    </Switch>
  );
};

export default Router;