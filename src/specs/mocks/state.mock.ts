import { ProductsState } from "src/app/modules/products/store/products.state";
import { PRODUCT_MOCK } from "./product.mock";

export const MOCKED_PRODUCT_STATE: ProductsState = {
  pending: false,
  products: [PRODUCT_MOCK],
};
