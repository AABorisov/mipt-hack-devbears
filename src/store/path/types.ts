import { ThunkFetchState } from '../types';
import { PathResponseData } from '../../utils/api/path/types';

export interface PathState extends PathResponseData, ThunkFetchState {}

export const FETCH_PATH_PENDING = 'FETCH_PATH_PENDING';
export const FETCH_PATH_SUCCESS = 'FETCH_PATH_SUCCESS';
export const FETCH_PATH_ERROR = 'FETCH_PATH_ERROR';

export interface FetchPathPendingAction {
  type: typeof FETCH_PATH_PENDING;
}

export interface FetchPathSuccessAction {
  type: typeof FETCH_PATH_SUCCESS;
  payload: PathResponseData;
}

export interface FetchPathErrorAction {
  type: typeof FETCH_PATH_ERROR;
}

export type FetchPathAction =
  | FetchPathPendingAction
  | FetchPathSuccessAction
  | FetchPathErrorAction;

export type PathAction = FetchPathAction; // | OtherPathAction
