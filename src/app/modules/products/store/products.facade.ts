import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Product, CreateProduct } from "../shared/model/products.model";
import { getProducts, deleteProduct, postProduct, updateProduct } from "./products.action";
import { selectProductsPending, selectProducts } from "./products.selector";

@Injectable()
export class ProductFacade {
  public selectProductsPending$: Observable<boolean> = this.store.pipe(select(selectProductsPending));
  public selectProducts$: Observable<Product[]> = this.store.pipe(select(selectProducts));

  constructor(private readonly store: Store) { }

  public getProducts(): void {
    this.store.dispatch(getProducts());
  }
  public deleteProduct(id: number): void {
    this.store.dispatch(deleteProduct({ id }));
  }
  public addProduct(product: CreateProduct): void {
    this.store.dispatch(postProduct(product));
  }
  public updateProduct(product: Product): void {
    this.store.dispatch(updateProduct(product));
  }
}
