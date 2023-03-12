import { Product } from "../shared/model/products.model";

export interface ProductsState {
  products: Product[];
  pending: boolean;
}
