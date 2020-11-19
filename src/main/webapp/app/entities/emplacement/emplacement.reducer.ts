import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmplacement, defaultValue } from 'app/shared/model/emplacement.model';

export const ACTION_TYPES = {
  FETCH_EMPLACEMENT_LIST: 'emplacement/FETCH_EMPLACEMENT_LIST',
  FETCH_EMPLACEMENT: 'emplacement/FETCH_EMPLACEMENT',
  CREATE_EMPLACEMENT: 'emplacement/CREATE_EMPLACEMENT',
  UPDATE_EMPLACEMENT: 'emplacement/UPDATE_EMPLACEMENT',
  DELETE_EMPLACEMENT: 'emplacement/DELETE_EMPLACEMENT',
  RESET: 'emplacement/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmplacement>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type EmplacementState = Readonly<typeof initialState>;

// Reducer

export default (state: EmplacementState = initialState, action): EmplacementState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EMPLACEMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EMPLACEMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_EMPLACEMENT):
    case REQUEST(ACTION_TYPES.UPDATE_EMPLACEMENT):
    case REQUEST(ACTION_TYPES.DELETE_EMPLACEMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_EMPLACEMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EMPLACEMENT):
    case FAILURE(ACTION_TYPES.CREATE_EMPLACEMENT):
    case FAILURE(ACTION_TYPES.UPDATE_EMPLACEMENT):
    case FAILURE(ACTION_TYPES.DELETE_EMPLACEMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLACEMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLACEMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_EMPLACEMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_EMPLACEMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_EMPLACEMENT):
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

const apiUrl = 'api/emplacements';

// Actions

export const getEntities: ICrudGetAllAction<IEmplacement> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EMPLACEMENT_LIST,
  payload: axios.get<IEmplacement>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IEmplacement> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EMPLACEMENT,
    payload: axios.get<IEmplacement>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEmplacement> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EMPLACEMENT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEmplacement> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EMPLACEMENT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEmplacement> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EMPLACEMENT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
