import { Moment } from 'moment';

export interface IUtilisateur {
  id?: number;
  idUtilisateur?: string;
  nom?: string;
  prenom?: string;
  dateNaissance?: string;
  role?: string;
  pseudo?: string;
  motDePasse?: string;
}

export const defaultValue: Readonly<IUtilisateur> = {};
