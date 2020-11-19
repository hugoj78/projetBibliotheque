import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Exemplaire from './exemplaire';
import ExemplaireDetail from './exemplaire-detail';
import ExemplaireUpdate from './exemplaire-update';
import ExemplaireDeleteDialog from './exemplaire-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ExemplaireUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ExemplaireUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ExemplaireDetail} />
      <ErrorBoundaryRoute path={match.url} component={Exemplaire} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ExemplaireDeleteDialog} />
  </>
);

export default Routes;
