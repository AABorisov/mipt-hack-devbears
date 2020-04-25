import {
  FETCH_PATH_ERROR,
  FETCH_PATH_PENDING,
  FETCH_PATH_SUCCESS,
  PathAction,
  PathState,
} from './types';

const initialState: PathState = {
  path: '',
  pending: false,
  error: false,
};

export default function pathReducer(
  state: PathState = initialState,
  action: PathAction
): PathState {
  switch (action.type) {
    case FETCH_PATH_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_PATH_SUCCESS:
      return {
        ...state,
        ...action.payload,
        pending: false,
      };
    case FETCH_PATH_ERROR:
      return {
        ...state,
        pending: false,
        error: true,
      };
    default:
      return state;
  }
}
