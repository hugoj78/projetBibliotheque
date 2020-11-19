import { IEmplacement } from 'app/shared/model/emplacement.model';
import { IAutheur } from 'app/shared/model/autheur.model';
import { IExemplaire } from 'app/shared/model/exemplaire.model';
import { ITheme } from 'app/shared/model/theme.model';

export interface ILivre {
  id?: number;
  idLivre?: string;
  titre?: string;
  description?: string;
  isbn?: string;
  code?: string;
  emplacement?: IEmplacement;
  autheur?: IAutheur;
  exemplaires?: IExemplaire[];
  themes?: ITheme[];
}

export const defaultValue: Readonly<ILivre> = {};
