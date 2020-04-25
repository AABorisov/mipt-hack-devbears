import { AnyAction, applyMiddleware, createStore, Store } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import rootReducer from './rootReducer';

export type AppState = ReturnType<typeof rootReducer>;

const middlewares = [thunk as ThunkMiddleware<AppState, AnyAction>];

const configureStore = (initialState = {}): Store<AppState> => {
  const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares));

  return store;
};

export default configureStore;
