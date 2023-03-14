import { TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { State } from "src/app/shared/models/store.model";
import { CREATE_PRODUCT_MOCK, PRODUCT_MOCK } from "src/specs/mocks/product.mock";
import { Spied } from "src/specs/utils.type";
import { Product } from "../shared/model/products.model";
import { deleteProduct, getProducts, postProduct, updateProduct } from "./products.action";
import { ProductFacade } from "./products.facade";

describe('ProductsFacade', () => {
  let facade: ProductFacade;
  let mockedStore: Spied<Store<State>>;
  beforeEach((): void => {
    mockedStore = jasmine.createSpyObj(Store, ['dispatch', 'pipe']);

    TestBed.configureTestingModule({
      providers: [
        ProductFacade,
        { provide: Store, useValue: mockedStore },
      ],
    });

    facade = TestBed.inject(ProductFacade);
  });
  describe('products', (): void => {
    it('should dispatch Post Products action', (): void => {
      const productDetails: Product = PRODUCT_MOCK;
      facade.addProduct(productDetails);

      expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
      expect(mockedStore.dispatch).toHaveBeenCalledWith(postProduct(productDetails));
    });
    it('should dispatch Get All Products action', (): void => {
      facade.getProducts();
      expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
      expect(mockedStore.dispatch).toHaveBeenCalledWith(getProducts());
    });
    it('should dispatch update Product action', (): void => {
      const productDetails: Product = PRODUCT_MOCK;
      facade.updateProduct(productDetails);
      expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
      expect(mockedStore.dispatch).toHaveBeenCalledWith(updateProduct(productDetails));
    });
    it('should dispatch delete Product action', (): void => {
      facade.deleteProduct(1);
      expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
      expect(mockedStore.dispatch).toHaveBeenCalledWith(deleteProduct({ id: 1 }));
    });
  });
});
