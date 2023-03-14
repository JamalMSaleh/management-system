import { CREATE_PRODUCT_MOCK, PRODUCT_MOCK } from "src/specs/mocks/product.mock";
import { MOCKED_PRODUCT_STATE } from "src/specs/mocks/state.mock";
import { deleteProduct, deleteProductSuccess, getProducts, postProduct, postProductSuccess, updateProduct } from "./products.action";
import { productsInitialState, productsReducer } from "./products.reducer";
import { ProductsState } from "./products.state";

describe('authReducer', (): void => {
  const pendingState: ProductsState = {
    ...productsInitialState,
    pending: true,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const requestSendingActions: any[] = [
    getProducts(), updateProduct(PRODUCT_MOCK), deleteProduct({ id: 1 }), postProduct(CREATE_PRODUCT_MOCK),
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const singleTestForGenericAction: (description: string, action: any, outputState: ProductsState) => void =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (description: string, action: any, outputState: ProductsState): void => {
      it(`${description} for ${action.type} action`, (): void => {
        const state: ProductsState = productsReducer(
          pendingState,
          action,
        );

        expect(state).not.toBe(MOCKED_PRODUCT_STATE);
        expect(state).toEqual(outputState);
      });
    };
  describe('Request Actions', (): void => {
    it('should set state to initial state when passed state is undefined', (): void => {
      const undefinedState: ProductsState | undefined = undefined;
      const state: ProductsState = productsReducer(
        undefinedState,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <any>'SOME_ACTION',
      );
      expect(state).toBe(productsInitialState);
    });
  });

  describe('request sending actions', (): void => {
    requestSendingActions.forEach(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (action: any): void => {
        singleTestForGenericAction('should add pending flag', action, pendingState);
      },
    );
  });
  describe('Success Actions', (): void => {
    it('should Delete Success and return list of Products Left in Database', (): void => {
      const pending: boolean = false;
      const state: ProductsState = productsReducer(
        productsInitialState,
        deleteProductSuccess({ products: [PRODUCT_MOCK] }),
      );
      expect(state).not.toBe(productsInitialState);
      expect(state).toEqual({
        ...productsInitialState,
        products: [PRODUCT_MOCK],
        pending,
      });
    });
  });
});
