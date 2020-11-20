import { Moment } from 'moment';
import { IExemplaire } from 'app/shared/model/exemplaire.model';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';

export interface IEmprunt {
  id?: number;
  idEmprunt?: string;
  dateEmprunt?: string;
  idUtilisateur?: number;
  idExemplaire?: number;
  exemplaire?: IExemplaire;
  utilisateur?: IUtilisateur;
}

export const defaultValue: Readonly<IEmprunt> = {};
