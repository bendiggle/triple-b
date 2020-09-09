import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  AddNewSelection,
  Players,
  Reports,
  WinPercentage,
  TeamForm,
  IndividualForm
} from './pages';

const TestRootComponent = () => <div>ROOT!!!!!!</div>

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={TestRootComponent} exact/>
      <Route path="/add-new-selections" component={AddNewSelection} exact/>
      <Route path="/players" component={Players} exact/>
      <Route path="/reports" component={Reports} exact/>
      <Route path="/reports/win-percentage" component={WinPercentage} exact/>
      <Route path="/reports/team-form" component={TeamForm} exact/>
      <Route path="/reports/individual-form" component={IndividualForm} exact/>
    </Switch>
  </BrowserRouter>
);

export default Routes;