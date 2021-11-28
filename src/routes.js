import React from "react";
import { Switch, Redirect } from "react-router-dom";
import { RouteWithLayout } from "./components/";

import KarangosListView from "./views/Karango/KarangosList";
import KarangoFormView from "./views/Karango/KarangoForm";
import ClientesListView from "./views/Cliente/ClientesList";
import ClientesFormView from "./views/Cliente/ClientesForm";

import { NotFound as NotFoundView } from "./views";

const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout
        component={KarangosListView}
        exact
        path="/karangos"
        private={false}
      />
      <RouteWithLayout
        component={KarangoFormView}
        exact
        path="/karangos/new"
        private={false}
      />
      <RouteWithLayout
        component={KarangoFormView}
        exact
        path="/karangos/new/:id"
        private={false}
      />

      <RouteWithLayout
        component={ClientesListView}
        exact
        path="/clientes"
        private={false}
      />
      <RouteWithLayout
        component={ClientesFormView}
        exact
        path="/clientes/new"
        private={false}
      />

      <RouteWithLayout
        component={ClientesFormView}
        exact
        path="/clientes/new/:id"
        private={false}
      />

      <RouteWithLayout component={NotFoundView} exact path="/not-found" />

      <RouteWithLayout component={ClientesListView} exact path="/" />

      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
