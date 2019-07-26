import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICaseParticipant, defaultValue } from 'app/shared/model/case-participant.model';

export const ACTION_TYPES = {
  FETCH_CASEPARTICIPANT_LIST: 'caseParticipant/FETCH_CASEPARTICIPANT_LIST',
  FETCH_CASEPARTICIPANT: 'caseParticipant/FETCH_CASEPARTICIPANT',
  CREATE_CASEPARTICIPANT: 'caseParticipant/CREATE_CASEPARTICIPANT',
  UPDATE_CASEPARTICIPANT: 'caseParticipant/UPDATE_CASEPARTICIPANT',
  DELETE_CASEPARTICIPANT: 'caseParticipant/DELETE_CASEPARTICIPANT',
  RESET: 'caseParticipant/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICaseParticipant>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CaseParticipantState = Readonly<typeof initialState>;

// Reducer

export default (state: CaseParticipantState = initialState, action): CaseParticipantState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CASEPARTICIPANT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CASEPARTICIPANT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CASEPARTICIPANT):
    case REQUEST(ACTION_TYPES.UPDATE_CASEPARTICIPANT):
    case REQUEST(ACTION_TYPES.DELETE_CASEPARTICIPANT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CASEPARTICIPANT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CASEPARTICIPANT):
    case FAILURE(ACTION_TYPES.CREATE_CASEPARTICIPANT):
    case FAILURE(ACTION_TYPES.UPDATE_CASEPARTICIPANT):
    case FAILURE(ACTION_TYPES.DELETE_CASEPARTICIPANT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CASEPARTICIPANT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CASEPARTICIPANT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CASEPARTICIPANT):
    case SUCCESS(ACTION_TYPES.UPDATE_CASEPARTICIPANT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CASEPARTICIPANT):
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

const apiUrl = 'api/case-participants';

// Actions

export const getEntities: ICrudGetAllAction<ICaseParticipant> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CASEPARTICIPANT_LIST,
  payload: axios.get<ICaseParticipant>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICaseParticipant> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CASEPARTICIPANT,
    payload: axios.get<ICaseParticipant>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICaseParticipant> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CASEPARTICIPANT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICaseParticipant> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CASEPARTICIPANT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICaseParticipant> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CASEPARTICIPANT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
