import { lazy } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UpDownLayout from "container/upDownLayout";
import LoadPage from "../components/loadPage";
import AuthRoute from "./authRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <UpDownLayout>
        <Switch>
          <Route
            path="/"
            exact={true}
            component={LoadPage(lazy(() => import("pages/website")))}
          />
          <AuthRoute
            path="/blog"
            exact={true}
            component={LoadPage(lazy(() => import("pages/blog")))}
          />
          <AuthRoute
            path="/manage"
            exact={true}
            component={LoadPage(lazy(() => import("pages/manage")))}
          />
        </Switch>
      </UpDownLayout>
    </BrowserRouter>
  );
};

export default Router;
