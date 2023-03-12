import { Order } from "../shared/model/order.model";

export interface OrdersState {
  orders: Order[];
  pending: boolean;
}
