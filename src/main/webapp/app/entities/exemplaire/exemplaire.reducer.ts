import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IExemplaire, defaultValue } from 'app/shared/model/exemplaire.model';

export const ACTION_TYPES = {
  FETCH_EXEMPLAIRE_LIST: 'exemplaire/FETCH_EXEMPLAIRE_LIST',
  FETCH_EXEMPLAIRE: 'exemplaire/FETCH_EXEMPLAIRE',
  CREATE_EXEMPLAIRE: 'exemplaire/CREATE_EXEMPLAIRE',
  UPDATE_EXEMPLAIRE: 'exemplaire/UPDATE_EXEMPLAIRE',
  DELETE_EXEMPLAIRE: 'exemplaire/DELETE_EXEMPLAIRE',
  RESET: 'exemplaire/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IExemplaire>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ExemplaireState = Readonly<typeof initialState>;

// Reducer

export default (state: ExemplaireState = initialState, action): ExemplaireState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EXEMPLAIRE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EXEMPLAIRE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_EXEMPLAIRE):
    case REQUEST(ACTION_TYPES.UPDATE_EXEMPLAIRE):
    case REQUEST(ACTION_TYPES.DELETE_EXEMPLAIRE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_EXEMPLAIRE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EXEMPLAIRE):
    case FAILURE(ACTION_TYPES.CREATE_EXEMPLAIRE):
    case FAILURE(ACTION_TYPES.UPDATE_EXEMPLAIRE):
    case FAILURE(ACTION_TYPES.DELETE_EXEMPLAIRE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EXEMPLAIRE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EXEMPLAIRE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_EXEMPLAIRE):
    case SUCCESS(ACTION_TYPES.UPDATE_EXEMPLAIRE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_EXEMPLAIRE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/exemplaires';

// Actions

export const getEntities: ICrudGetAllAction<IExemplaire> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EXEMPLAIRE_LIST,
  payload: axios.get<IExemplaire>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IExemplaire> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EXEMPLAIRE,
    payload: axios.get<IExemplaire>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IExemplaire> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EXEMPLAIRE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IExemplaire> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EXEMPLAIRE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IExemplaire> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EXEMPLAIRE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
