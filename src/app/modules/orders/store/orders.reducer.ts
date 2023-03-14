import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { Order, PropsOrders } from "../shared/model/order.model";
import { getOrders, getOrdersSuccess, postOrder, postOrderSuccess, updateOrder, updateOrderSuccess, deleteOrder, deleteOrderSuccess } from "./orders.action";
import { OrdersState } from "./orders.state";

export const ordersInitialState: OrdersState = {
  orders: [],
  pending: false,
};
export const OrdersReducer: ActionReducer<OrdersState, Action> =
  createReducer(
    ordersInitialState,
    on(getOrders, updateOrder, deleteOrder, postOrder, (state: OrdersState) => ({
      ...state,
      pending: true,
    })),
    on(getOrdersSuccess, (state: OrdersState, { orders }: PropsOrders) => ({
      ...state,
      orders,
      pending: false,
    })),
    on(postOrderSuccess, (state: OrdersState, order: Order) => {
      const newOrdersState: Order[] = [...state.orders, order];
      return { ...state, orders: newOrdersState, pending: false };
    }),

    on(updateOrderSuccess, (state: OrdersState, order: Order) => {
      const newOrdersState: Order[] = state.orders.filter(
        (_: Order) => _.id !== order.id,
      );
      newOrdersState.push(order);
      const newState: OrdersState = { ...state, orders: newOrdersState, pending: false };
      return newState;
    }),
    on(deleteOrderSuccess, (state: OrdersState, { orders }: PropsOrders) => ({
      ...state,
      orders,
      pending: false,
    })),
  );
