import { ILivre } from 'app/shared/model/livre.model';

export interface IExemplaire {
  id?: number;
  idExemplaire?: string;
  disponibilite?: boolean;
  idLivre?: number;
  livre?: ILivre;
}

export const defaultValue: Readonly<IExemplaire> = {
  disponibilite: false,
};
