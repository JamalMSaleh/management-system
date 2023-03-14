import { createAction, props } from "@ngrx/store";
import { ActionCreatorPropsType, ActionCreatorType } from "src/app/shared/types/action.types";
import { ActionTypes } from "../shared/enums/action-types.enum";
import { CreateOrder, Order, PropsOrders } from "../shared/model/order.model";

export const getOrders: ActionCreatorType<ActionTypes.GetOrders> = createAction(ActionTypes.GetOrders);
export const getOrdersSuccess: ActionCreatorPropsType<ActionTypes.GetOrdersSuccess, PropsOrders> = createAction(ActionTypes.GetOrdersSuccess, props<PropsOrders>());
export const getOrdersError: ActionCreatorType<ActionTypes.GetOrdersError> = createAction(ActionTypes.GetOrdersError);

export const updateOrder: ActionCreatorPropsType<ActionTypes.UpdateOrder, Order> = createAction(ActionTypes.UpdateOrder, props<Order>());
export const updateOrderSuccess: ActionCreatorPropsType<ActionTypes.UpdateOrderSuccess, Order> = createAction(
  ActionTypes.UpdateOrderSuccess,
  props<Order>(),
);
export const updateOrderError: ActionCreatorType<ActionTypes.UpdateOrderError> = createAction(ActionTypes.UpdateOrderError);

export const deleteOrder: ActionCreatorPropsType<ActionTypes.DeleteOrder, { id: number }> = createAction(
  ActionTypes.DeleteOrder,
  props<{ id: number }>(),
);
export const deleteOrderSuccess: ActionCreatorPropsType<ActionTypes.DeleteOrderSuccess, PropsOrders> = createAction(
  ActionTypes.DeleteOrderSuccess,
  props<PropsOrders>(),
);
export const deleteOrderError: ActionCreatorType<ActionTypes.DeleteOrderError> = createAction(ActionTypes.DeleteOrderError);

export const postOrder: ActionCreatorPropsType<ActionTypes.PostOrder, CreateOrder> = createAction(
  ActionTypes.PostOrder,
  props<CreateOrder>(),
);
export const postOrderSuccess: ActionCreatorPropsType<ActionTypes.PostOrderSuccess, Order> = createAction(
  ActionTypes.PostOrderSuccess,
  props<Order>(),
);
export const postOrderError: ActionCreatorType<ActionTypes.PostOrderError> = createAction(ActionTypes.PostOrderError);
