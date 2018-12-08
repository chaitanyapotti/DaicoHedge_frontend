import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import InvestorPage from './containers/InvestorPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.HOME} component={InvestorPage} />
      <Route path={routes.INVESTOR} component={InvestorPage} />
    </Switch>
  </App>
);
