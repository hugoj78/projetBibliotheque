import { ILivre } from 'app/shared/model/livre.model';

export interface ITheme {
  id?: number;
  idTheme?: string;
  theme?: string;
  livres?: ILivre[];
}

export const defaultValue: Readonly<ITheme> = {};
