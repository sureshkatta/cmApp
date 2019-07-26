import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICaseHeader, defaultValue } from 'app/shared/model/case-header.model';

export const ACTION_TYPES = {
  FETCH_CASEHEADER_LIST: 'caseHeader/FETCH_CASEHEADER_LIST',
  FETCH_CASEHEADER: 'caseHeader/FETCH_CASEHEADER',
  CREATE_CASEHEADER: 'caseHeader/CREATE_CASEHEADER',
  UPDATE_CASEHEADER: 'caseHeader/UPDATE_CASEHEADER',
  DELETE_CASEHEADER: 'caseHeader/DELETE_CASEHEADER',
  RESET: 'caseHeader/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICaseHeader>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CaseHeaderState = Readonly<typeof initialState>;

// Reducer

export default (state: CaseHeaderState = initialState, action): CaseHeaderState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CASEHEADER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CASEHEADER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CASEHEADER):
    case REQUEST(ACTION_TYPES.UPDATE_CASEHEADER):
    case REQUEST(ACTION_TYPES.DELETE_CASEHEADER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CASEHEADER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CASEHEADER):
    case FAILURE(ACTION_TYPES.CREATE_CASEHEADER):
    case FAILURE(ACTION_TYPES.UPDATE_CASEHEADER):
    case FAILURE(ACTION_TYPES.DELETE_CASEHEADER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CASEHEADER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CASEHEADER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CASEHEADER):
    case SUCCESS(ACTION_TYPES.UPDATE_CASEHEADER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CASEHEADER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/case-headers';

// Actions

export const getEntities: ICrudGetAllAction<ICaseHeader> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CASEHEADER_LIST,
  payload: axios.get<ICaseHeader>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICaseHeader> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CASEHEADER,
    payload: axios.get<ICaseHeader>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICaseHeader> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CASEHEADER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICaseHeader> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CASEHEADER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICaseHeader> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CASEHEADER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
