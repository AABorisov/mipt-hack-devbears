import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

export type ThunkResult<R, A extends Action> = ThunkAction<R, undefined, undefined, A>;

export interface ThunkFetchState {
  pending: boolean;
  error: boolean;
}
