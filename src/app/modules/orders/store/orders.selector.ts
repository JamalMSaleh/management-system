import { createFeatureSelector, createSelector, DefaultProjectorFn, MemoizedSelector } from "@ngrx/store";
import { Order } from "../shared/model/order.model";
import { OrdersState } from "./orders.state";

export const selectOrdersFeature: MemoizedSelector<
  object,
  OrdersState,
  DefaultProjectorFn<OrdersState>
> = createFeatureSelector<OrdersState>('Orders');

export const selectOrdersPending: MemoizedSelector<
  object,
  boolean,
  DefaultProjectorFn<boolean>
> = createSelector(
  selectOrdersFeature,
  (state: OrdersState) => state.pending,
);
export const selectOrders: MemoizedSelector<
  object,
  Order[],
  DefaultProjectorFn<Order[]>
> = createSelector(
  selectOrdersFeature,
  (state: OrdersState) => state.orders,
);
