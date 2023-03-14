import { ActionReducer, Action, createReducer, on } from "@ngrx/store";
import { Product, PropsProducts } from "../shared/model/products.model";
import { getProducts, getProductsSuccess, postProduct, postProductSuccess, updateProduct, updateProductSuccess, deleteProduct, deleteProductSuccess } from "./products.action";
import { ProductsState } from "./products.state";
export const productsInitialState: ProductsState = {
  products: [],
  pending: false,
};
export const productsReducer: ActionReducer<ProductsState, Action> =
  createReducer(
    productsInitialState,
    on(getProducts, updateProduct, deleteProduct, postProduct, (state: ProductsState) => ({
      ...state,
      pending: true,
    })),
    on(getProductsSuccess, (state: ProductsState, { products }: PropsProducts) => ({
      ...state,
      products,
      pending: false,
    })),
    on(updateProductSuccess, (state: ProductsState, product: Product) => {
      const newProductsState: Product[] = state.products.filter(
        (_: Product) => _.id !== product.id,
      );
      newProductsState.push(product);
      const newState: ProductsState = { ...state, products: newProductsState, pending: false };
      return newState;
    }),
    on(deleteProductSuccess, (state: ProductsState, { products }: PropsProducts) => ({
      ...state,
      products,
      pending: false,
    })),
    on(postProductSuccess, (state: ProductsState, product: Product) => {
      const newProductsState: Product[] = [...state.products, product];
      return { ...state, products: newProductsState, pending: false };
    }),
  );
