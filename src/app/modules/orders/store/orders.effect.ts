import { Injectable } from "@angular/core";
import { Actions, createEffect, CreateEffectMetadata, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, of, tap } from "rxjs";
import { OrdersService } from "src/app/services/orders.service";
import { ToastService } from "src/app/services/toast.service";
import { updateOrganization } from "../../organizations/store/organizations.action";
import { ActionTypes } from "../shared/enums/action-types";
import { Order, CreateOrder } from "../shared/model/order.model";
import { getOrders, getOrdersSuccess, getOrdersError, getOrder, getOrderSuccess, getOrderError, postOrder, postOrderSuccess, postOrderError, updateOrder, updateOrderSuccess, updateOrderError, deleteOrder, deleteOrderSuccess, deleteOrderError } from "./orders.action";
@Injectable()
export class OrdersEffect {
  getAllOrders$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrders),
      switchMap(() => this.ordersService.getAll()),
      map((orders: Order[]) =>
        getOrdersSuccess({ orders }),
      ),
      catchError(() => of(getOrdersError())),
    ),
  );
  getAllOrdersError$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrdersError),
      tap(() => {
        this.toastService.addErrorMessage(ActionTypes.GetOrderError);
      }),
    ),
    { dispatch: false },
  );

  getOrderByKey$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrder),
      switchMap((action: { id: number }) => this.ordersService.getOrderByKey(action.id)),
      map((order: Order) => getOrderSuccess(order)),
      tap(() => {
        this.toastService.addSuccessMessage(ActionTypes.GetOrderSuccess);
      }),
      catchError(() => of(getOrderError())),
    ),
  );
  getOrderByKeyError$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrderError),
      tap(() => {
        this.toastService.addErrorMessage(ActionTypes.GetOrderError);
      }),
    ),
    { dispatch: false },
  );
  addOrder$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(postOrder),
      switchMap((action: CreateOrder) => this.ordersService.addOrder(action)),
      map((order: Order) => postOrderSuccess(order)),
      tap(() => {
        this.toastService.addSuccessMessage(ActionTypes.PostOrderSuccess);
      }),
      catchError(() => of(postOrderError())),
    ),
  );

  addOrderError$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(postOrderError),
      tap(() => {
        this.toastService.addErrorMessage(ActionTypes.PostOrderError);
      }),
    ),
    { dispatch: false },
  );
  updateOrder$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(updateOrder),
      switchMap((action: Order) => this.ordersService.update(action)),
      map((order: Order) => updateOrderSuccess(order)),

      tap(() => {
        this.toastService.addSuccessMessage(ActionTypes.UpdateOrderSuccess);
      }),
      catchError(() => of(updateOrderError())),
    ),
  );
  updateOrderError$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(updateOrderError),
      tap(() => {
        this.toastService.addErrorMessage(ActionTypes.UpdateOrderError);
      }),
    ),
    { dispatch: false },
  );
  deleteOrder$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteOrder),
      switchMap((action: { id: number }) => this.ordersService.delete(action.id)),
      map((orders: Order[]) =>
        deleteOrderSuccess({ orders }),
      ), tap(() => {
        this.toastService.addSuccessMessage(ActionTypes.DeleteOrderSuccess);
      }),
      catchError(() => of(deleteOrderError())),
    ),
  );
  deleteOrderError$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteOrderError),
      tap(() => {
        this.toastService.addErrorMessage(ActionTypes.DeleteOrderError);
      }),
    ),
    { dispatch: false },
  );
  constructor(
    private readonly actions$: Actions,
    private readonly ordersService: OrdersService,
    private readonly toastService: ToastService,
  ) { }
}
