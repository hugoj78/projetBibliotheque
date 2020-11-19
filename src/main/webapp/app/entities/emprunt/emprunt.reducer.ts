import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmprunt, defaultValue } from 'app/shared/model/emprunt.model';

export const ACTION_TYPES = {
  FETCH_EMPRUNT_LIST: 'emprunt/FETCH_EMPRUNT_LIST',
  FETCH_EMPRUNT: 'emprunt/FETCH_EMPRUNT',
  CREATE_EMPRUNT: 'emprunt/CREATE_EMPRUNT',
  UPDATE_EMPRUNT: 'emprunt/UPDATE_EMPRUNT',
  DELETE_EMPRUNT: 'emprunt/DELETE_EMPRUNT',
  RESET: 'emprunt/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmprunt>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type EmpruntState = Readonly<typeof initialState>;

// Reducer

export default (state: EmpruntState = initialState, action): EmpruntState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EMPRUNT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EMPRUNT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_EMPRUNT):
    case REQUEST(ACTION_TYPES.UPDATE_EMPRUNT):
    case REQUEST(ACTION_TYPES.DELETE_EMPRUNT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_EMPRUNT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EMPRUNT):
    case FAILURE(ACTION_TYPES.CREATE_EMPRUNT):
    case FAILURE(ACTION_TYPES.UPDATE_EMPRUNT):
    case FAILURE(ACTION_TYPES.DELETE_EMPRUNT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPRUNT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPRUNT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_EMPRUNT):
    case SUCCESS(ACTION_TYPES.UPDATE_EMPRUNT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_EMPRUNT):
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

const apiUrl = 'api/emprunts';

// Actions

export const getEntities: ICrudGetAllAction<IEmprunt> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EMPRUNT_LIST,
  payload: axios.get<IEmprunt>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IEmprunt> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EMPRUNT,
    payload: axios.get<IEmprunt>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEmprunt> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EMPRUNT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEmprunt> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EMPRUNT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEmprunt> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EMPRUNT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
