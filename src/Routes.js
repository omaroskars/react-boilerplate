import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Dashboard from './scenes/dashboard/Dashboard';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
  </Switch>
);

export default Routes;