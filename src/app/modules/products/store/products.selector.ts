import {
  createFeatureSelector,
  createSelector,
  DefaultProjectorFn,
  MemoizedSelector,
} from '@ngrx/store';
import { Product } from '../shared/model/products.model';
import { ProductsState } from './products.state';
export const selectProductsFeature: MemoizedSelector<
  object,
  ProductsState,
  DefaultProjectorFn<ProductsState>
> = createFeatureSelector<ProductsState>('Products');

export const selectProductsPending: MemoizedSelector<
  object,
  boolean,
  DefaultProjectorFn<boolean>
> = createSelector(
  selectProductsFeature,
  (state: ProductsState) => state.pending,
);
export const selectProducts: MemoizedSelector<
  object,
  Product[],
  DefaultProjectorFn<Product[]>
> = createSelector(
  selectProductsFeature,
  (state: ProductsState) => state.products,
);
