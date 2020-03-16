import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AddNewSelection, Players, Reports } from './pages';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/add-new-selections" component={AddNewSelection} exact/>
      <Route path="/players" component={Players} exact/>
      <Route path="/reports" component={Reports} exact/>
    </Switch>
  </BrowserRouter>
);

export default Routes;