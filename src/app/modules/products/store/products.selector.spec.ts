import { async, TestBed } from "@angular/core/testing";
import { Store, StoreModule } from "@ngrx/store";
import { Product } from "../shared/model/products.model";
import { productsReducer } from "./products.reducer";
import { selectProducts, selectProductsFeature, selectProductsPending } from "./products.selector";
import { ProductsState } from './products.state';

describe('ProductSelector', (): void => {
  const initialState: ProductsState = {
    pending: false,
    products: [],
  };
  it("should select the initial State", () => {
    const feature: ProductsState = selectProductsFeature.projector(initialState);
    expect(feature).toEqual(initialState);
  });
  it('should select the Products', (): void => {
    const products: Product[] = selectProducts.projector(initialState);
    expect(products).toEqual([]);
  });
  it('should select the Products Pending', (): void => {
    const products: boolean = selectProductsPending.projector(initialState);
    expect(products).toEqual(false);
  });
});
