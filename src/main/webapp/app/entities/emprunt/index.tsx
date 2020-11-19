import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Emprunt from './emprunt';
import EmpruntDetail from './emprunt-detail';
import EmpruntUpdate from './emprunt-update';
import EmpruntDeleteDialog from './emprunt-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmpruntUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmpruntUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmpruntDetail} />
      <ErrorBoundaryRoute path={match.url} component={Emprunt} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EmpruntDeleteDialog} />
  </>
);

export default Routes;
