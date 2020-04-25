import {
  FETCH_PATH_ERROR,
  FETCH_PATH_PENDING,
  FETCH_PATH_SUCCESS,
  FetchPathErrorAction,
  FetchPathPendingAction,
  FetchPathSuccessAction,
  FetchPathAction,
} from './types';
import { getPath } from '../../utils/api/path';
import { ThunkResult } from '../types';
import { PathResponseData } from '../../utils/api/path/types';

export const fetchPathPending = (): FetchPathPendingAction => ({
  type: FETCH_PATH_PENDING,
});

export const fetchPathSuccess = (showNotifications: PathResponseData): FetchPathSuccessAction => ({
  type: FETCH_PATH_SUCCESS,
  payload: showNotifications,
});

export const fetchPathError = (): FetchPathErrorAction => ({
  type: FETCH_PATH_ERROR,
});

export const fetchPath = (): ThunkResult<Promise<void>, FetchPathAction> => async (
  dispatch
): Promise<void> => {
  dispatch(fetchPathPending());
  try {
    const path = await getPath();
    dispatch(fetchPathSuccess(path));
  } catch (error) {
    dispatch(fetchPathError());
  }
};
