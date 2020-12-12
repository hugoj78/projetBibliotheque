import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Utilisateur from './utilisateur';
import UtilisateurDetail from './utilisateur-detail';
import UtilisateurUpdate from './utilisateur-update';
import UtilisateurDeleteDialog from './utilisateur-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={UtilisateurUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={UtilisateurUpdate} />
      <Route exact path={`${match.url}/:id`} component={UtilisateurDetail} />
      <Route path={match.url} component={Utilisateur} />
    </Switch>
    <Route exact path={`${match.url}/:id/delete`} component={UtilisateurDeleteDialog} />
  </>
);

export default Routes;
