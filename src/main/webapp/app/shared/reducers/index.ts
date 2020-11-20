import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import theme, {
  ThemeState
} from 'app/entities/theme/theme.reducer';
// prettier-ignore
import livre, {
  LivreState
} from 'app/entities/livre/livre.reducer';
// prettier-ignore
import emplacement, {
  EmplacementState
} from 'app/entities/emplacement/emplacement.reducer';
// prettier-ignore
import exemplaire, {
  ExemplaireState
} from 'app/entities/exemplaire/exemplaire.reducer';
// prettier-ignore
import emprunt, {
  EmpruntState
} from 'app/entities/emprunt/emprunt.reducer';
// prettier-ignore
import utilisateur, {
  UtilisateurState
} from 'app/entities/utilisateur/utilisateur.reducer';
// prettier-ignore
import autheur, {
  AutheurState
} from 'app/entities/autheur/autheur.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly theme: ThemeState;
  readonly livre: LivreState;
  readonly emplacement: EmplacementState;
  readonly exemplaire: ExemplaireState;
  readonly emprunt: EmpruntState;
  readonly utilisateur: UtilisateurState;
  readonly autheur: AutheurState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  theme,
  livre,
  emplacement,
  exemplaire,
  emprunt,
  utilisateur,
  autheur,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
