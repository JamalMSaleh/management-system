import { createAction, props } from "@ngrx/store";
import { ActionCreatorType, ActionCreatorPropsType } from "src/app/shared/types/action.types";
import { ActionTypes } from "../shared/enums/action-types";
import { CreateProduct, Id, Product, PropsProducts } from "../shared/model/products.model";

export const getProducts: ActionCreatorType<ActionTypes.GetProducts> =
  createAction(ActionTypes.GetProducts);
export const getProductsSuccess: ActionCreatorPropsType<
  ActionTypes.GetProductsSuccess,
  PropsProducts
> = createAction(ActionTypes.GetProductsSuccess, props<PropsProducts>());
export const getProductsError: ActionCreatorType<ActionTypes.GetProductsError> =
  createAction(ActionTypes.GetProductsError);

export const postProduct: ActionCreatorPropsType<ActionTypes.PostProduct, CreateProduct> = createAction(
  ActionTypes.PostProduct,
  props<CreateProduct>(),
);
export const postProductSuccess: ActionCreatorPropsType<ActionTypes.PostProductSuccess, Product> = createAction(
  ActionTypes.PostProductSuccess,
  props<Product>(),
);
export const postProductError: ActionCreatorType<ActionTypes.PostProductError> = createAction(ActionTypes.PostProductError);

export const updateProduct: ActionCreatorPropsType<ActionTypes.UpdateProduct, Product> = createAction(
  ActionTypes.UpdateProduct,
  props<Product>(),
);
export const updateProductSuccess: ActionCreatorPropsType<ActionTypes.UpdateProductSuccess, Product> = createAction(
  ActionTypes.UpdateProductSuccess,
  props<Product>(),
);
export const updateProductError: ActionCreatorType<ActionTypes.UpdateProductError> = createAction(ActionTypes.UpdateProductError);

export const deleteProduct: ActionCreatorPropsType<ActionTypes.DeleteProduct, Id> = createAction(
  ActionTypes.DeleteProduct,
  props<Id>(),
);
export const deleteProductSuccess: ActionCreatorPropsType<ActionTypes.DeleteProductSuccess, PropsProducts> = createAction(
  ActionTypes.DeleteProductSuccess,
  props<PropsProducts>(),
);
export const deleteProductError: ActionCreatorType<ActionTypes.DeleteProductError> = createAction(ActionTypes.DeleteProductError);
