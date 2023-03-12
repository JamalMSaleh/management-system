import { ActionReducer } from '@ngrx/store';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LazyModules {

}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Shared {
}

export interface State extends LazyModules {
  shared: Shared;
}

export interface Reducers {
  shared: ActionReducer<Shared>;
}
