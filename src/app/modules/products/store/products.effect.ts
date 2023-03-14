import { Injectable } from "@angular/core";
import { Actions, createEffect, CreateEffectMetadata, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, of, tap } from "rxjs";
import { ProductService } from "src/app/shared/services/products.service";
import { ToastService } from "src/app/shared/services/toast.service";
import { ActionTypes } from "../shared/enums/action-types";
import { Product } from "../shared/model/products.model";
import { getProducts, getProductsSuccess, getProductsError, postProduct, postProductError, updateProduct, updateProductSuccess, updateProductError, deleteProduct, deleteProductSuccess, deleteProductError, postProductSuccess } from "./products.action";

@Injectable()
export class ProductsEffect {

  getAllProducts$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(getProducts),
      switchMap(() => this.productService.getAll()),
      map((products: Product[]) =>
        getProductsSuccess({ products }),
      ),
      catchError(() => of(getProductsError())),
    ),
  );
  getAllProductsError$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(getProductsError),
      tap(() => {
        this.toastService.addErrorMessage(ActionTypes.GetProductsError);
      }),
    ),
    { dispatch: false },
  );

  addProduct$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(postProduct),
      switchMap((action: Product) => this.productService.addProduct(action)),
      map((product: Product) => postProductSuccess(product)),
      tap(() => {
        this.toastService.addSuccessMessage(ActionTypes.PostProductSuccess);
      }),
      catchError(() => of(postProductError())),
    ),
  );
  addProductError$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(postProductError),
      tap(() => {
        this.toastService.addErrorMessage(ActionTypes.PostProductError);
      }),
    ),
    { dispatch: false },
  );
  updateProduct$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProduct),
      switchMap((action: Product) => this.productService.update(action)),
      map((product: Product) => updateProductSuccess(product)),
      tap(() => {
        this.toastService.addSuccessMessage(ActionTypes.UpdateProductSuccess);
      }),
      catchError(() => of(updateProductError())),
    ),
  );
  updateProductError$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProductError),
      tap(() => {
        this.toastService.addErrorMessage(ActionTypes.UpdateProductError);
      }),
    ),
    { dispatch: false },
  );
  deleteProduct$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      switchMap((action: { id: number }) => this.productService.delete(action.id)),
      map((products: Product[]) =>
        deleteProductSuccess({ products }),
      ),
      tap(() => {
        this.toastService.addSuccessMessage(ActionTypes.DeleteProductSuccess);
      }),
      catchError(() => of(deleteProductError())),
    ),
  );
  deleteProductError$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProductError),
      tap(() => {
        this.toastService.addErrorMessage(ActionTypes.DeleteProductError);
      }),
    ),
    { dispatch: false },
  );
  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService,
    private readonly toastService: ToastService) { }

}
