import { Injectable } from "@angular/core";
import { Actions, createEffect, CreateEffectMetadata, ofType } from "@ngrx/effects";
import { MessageService } from "primeng/api";
import { switchMap, map, catchError, of, tap } from "rxjs";
import { ProductService } from "src/app/services/products.service";
import { ErrorMessages } from "../shared/enums/error-messages";
import { Product } from "../shared/model/products.model";
import { getProducts, getProductsSuccess, getProductsError, getProduct, getProductSuccess, getProductError, postProduct, postProductError, updateProduct, updateProductSuccess, updateProductError, deleteProduct, deleteProductSuccess, deleteProductError, postProductSuccess } from "./products.action";

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
        this.addErrorMessage(ErrorMessages.GetAllProductsError);
      }),
    ),
    { dispatch: false },
  );
  getProductByKey$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(getProduct),
      switchMap((action: { id: number }) => this.productService.getProductByKey(action.id)),
      map((element: Product) => getProductSuccess(element)),
      catchError(() => of(getProductError())),
    ),
  );
  getProductByKeyError$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(getProductError),
      tap(() => {
        this.addErrorMessage(ErrorMessages.GetProductByKeyError);
      }),
    ),
    { dispatch: false },
  );
  addProduct$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(postProduct),
      switchMap((action: Product) => this.productService.addProduct(action)),
      map((product: Product) => postProductSuccess(product)),
      catchError(() => of(postProductError())),
    ),
  );
  addProductError$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(postProductError),
      tap(() => {
        this.addErrorMessage(ErrorMessages.AddProductError);
      }),
    ),
    { dispatch: false },
  );
  updateProduct$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProduct),
      switchMap((action: Product) => this.productService.update(action)),
      map((product: Product) => updateProductSuccess(product)),
      catchError(() => of(updateProductError())),
    ),
  );
  updateProductError$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProductError),
      tap(() => {
        this.addErrorMessage(ErrorMessages.UpdateProductError);
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
      catchError(() => of(deleteProductError())),
    ),
  );
  deleteProductError$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProductError),
      tap(() => {
        this.addErrorMessage(ErrorMessages.DeleteProductError);
      }),
    ),
    { dispatch: false },
  );
  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService,
    private readonly messageService: MessageService) { }

  private addErrorMessage(detail: string): void {
    this.messageService.add(
      {
        key: 'Error', severity: 'error', summary: 'Error', detail,
        life: 9999999,
        sticky: true,
        closable: true,
      },
    );
  }
}
