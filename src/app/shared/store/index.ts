import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

export interface State {
  router: unknown;
}

export const initialState: State = {
  router: routerReducer
};

export const reducers: ActionReducerMap<State> = { router: routerReducer };

export const metaReducers: Array<MetaReducer<State>> = [];
