import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Autheur from './autheur';
import AutheurDetail from './autheur-detail';
import AutheurUpdate from './autheur-update';
import AutheurDeleteDialog from './autheur-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AutheurUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AutheurUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AutheurDetail} />
      <ErrorBoundaryRoute path={match.url} component={Autheur} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AutheurDeleteDialog} />
  </>
);

export default Routes;
