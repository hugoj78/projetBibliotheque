import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Emplacement from './emplacement';
import EmplacementDetail from './emplacement-detail';
import EmplacementUpdate from './emplacement-update';
import EmplacementDeleteDialog from './emplacement-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmplacementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmplacementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmplacementDetail} />
      <ErrorBoundaryRoute path={match.url} component={Emplacement} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EmplacementDeleteDialog} />
  </>
);

export default Routes;
