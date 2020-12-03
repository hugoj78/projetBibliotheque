import React from 'react';
import { Switch } from 'react-router-dom';
import { AUTHORITIES } from 'app/config/constants';
import PrivateRoute from 'app/shared/auth/private-route';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Theme from './theme';
import Livre from './livre';
import Emplacement from './emplacement';
import Exemplaire from './exemplaire';
import Emprunt from './emprunt';
import Utilisateur from './utilisateur';
import Autheur from './autheur';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}theme`} component={Theme} />
      <ErrorBoundaryRoute path={`${match.url}livre`} component={Livre} />
      <ErrorBoundaryRoute path={`${match.url}emplacement`} component={Emplacement} />
      <ErrorBoundaryRoute path={`${match.url}exemplaire`} component={Exemplaire} />
      <ErrorBoundaryRoute path={`${match.url}emprunt`} component={Emprunt} />
      <ErrorBoundaryRoute path={`${match.url}utilisateur`} component={Utilisateur}/>
      <ErrorBoundaryRoute path={`${match.url}autheur`} component={Autheur} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
