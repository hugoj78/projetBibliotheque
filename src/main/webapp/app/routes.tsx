import React from 'react';
import { Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import Login from 'app/modules/loginBiblio/login';
import Register from 'app/entities/utilisateur/utilisateur-update';
// import Activate from 'app/modules/account/activate/activate';
// import PasswordResetInit from 'app/modules/account/password-reset/init/password-reset-init';
// import PasswordResetFinish from 'app/modules/account/password-reset/finish/password-reset-finish';
import Logout from 'app/modules/login/logout';
import HomePage from 'app/modules/homeBiblio/homePage';
import Entities from 'app/entities';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import PageNotFound from 'app/shared/error/page-not-found';
import { AUTHORITIES } from 'app/config/constants';

const Account = Loadable({
  loader: () => import(/* webpackChunkName: "account" */ 'app/modules/account'),
  loading: () => <div>loading ...</div>,
});

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
  loading: () => <div>loading ...</div>,
});

const Routes = () => (
  <div className="view-routes">
    <Switch>
      <ErrorBoundaryRoute path="/login" component={Login} />
      <ErrorBoundaryRoute path="/logout" component={Logout} />
      <ErrorBoundaryRoute path="/account/register" component={Register} />
      {/* <ErrorBoundaryRoute path="/account/activate/:key?" component={Activate} />
      <ErrorBoundaryRoute path="/account/reset/request" component={PasswordResetInit} />
      <ErrorBoundaryRoute path="/account/reset/finish/:key?" component={PasswordResetFinish} /> */}
      <ErrorBoundaryRoute path="/admin" component={Admin} />
      <ErrorBoundaryRoute path="/account" component={Account} />
      <ErrorBoundaryRoute path="/" exact component={HomePage} />
      <ErrorBoundaryRoute path="/" component={Entities} />
      <ErrorBoundaryRoute component={PageNotFound} />
    </Switch>
  </div>
);

export default Routes;
