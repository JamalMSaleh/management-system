import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Order, CreateOrder } from "../shared/model/order.model";
import { deleteOrder, getOrder, getOrders, postOrder } from "./orders.action";
import { selectOrders, selectOrdersPending } from "./orders.selector";
@Injectable(
  {
    providedIn: 'root',
  },
)
export class OrdersFacade {
  public selectOrdersPending$: Observable<boolean> = this.store.pipe(select(selectOrdersPending));
  public selectOrders$: Observable<Order[]> = this.store.pipe(select(selectOrders));

  constructor(private readonly store: Store) { }

  public getOrders(): void {
    this.store.dispatch(getOrders());
  }
  public getOrder(id: number): void {
    this.store.dispatch(getOrder({ id }));
  }
  public deleteOrder(id: number): void {
    this.store.dispatch(deleteOrder({ id }));
  }
  public addOrder(order: CreateOrder): void {
    this.store.dispatch(postOrder(order));
  }
}
