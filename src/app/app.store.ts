import { InjectionToken, Provider } from "@angular/core";
import { ActionReducer, ActionReducerMap, combineReducers } from "@ngrx/store";
import { ordersInitialState } from "./modules/orders/store/orders.reducer";
import { organizationsInitialState } from "./modules/organizations/store/organizations.reducer";
import { productsInitialState } from "./modules/products/store/products.reducer";
import { Reducers, State, Shared } from "./shared/models/store.model";

export const initialState: State = {
  products: productsInitialState,
  organizations: organizationsInitialState,
  orders: ordersInitialState,
  shared: {
  },
};
export const getReducers: () => Reducers = (): Reducers => reducers;

export const getInitialState: () => State = (): State => initialState;

const sharedReducers: ActionReducer<Shared> = combineReducers({
});

export const reducers: Reducers = {
  shared: sharedReducers,
};

export const reducerToken: InjectionToken<ActionReducerMap<State>> = new InjectionToken('Registered Reducers');

export const REDUCER_PROVIDER: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
