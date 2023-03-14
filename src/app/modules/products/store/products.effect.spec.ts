import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { Message, MessageService } from "primeng/api";
import { Observable, of, Subject, take } from "rxjs";
import { ProductService } from "src/app/shared/services/products.service";
import { ToastService } from "src/app/shared/services/toast.service";
import { CREATE_PRODUCT_MOCK, PRODUCT_MOCK } from "src/specs/mocks/product.mock";
import { Spied } from "src/specs/utils.type";
import { ActionTypes } from "../shared/enums/action-types";
import { Product } from "../shared/model/products.model";
import { deleteProduct, getProducts } from "./products.action";
import { ProductsEffect } from "./products.effect";
import { ProductFacade } from "./products.facade";

describe('ProductEffect', (): void => {
  let effects: ProductsEffect;
  let mockedProductService: Spied<ProductService>;
  let mockedProductFacade: Spied<ProductsEffect>;
  let mockedMessageService: Spied<MessageService>;
  let mockedToastService: Spied<ToastService>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockedActions$: Observable<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let actionsSubject: Subject<any>;
  beforeEach((): void => {
    actionsSubject = new Subject();
    mockedActions$ = actionsSubject.asObservable();

    mockedProductService = jasmine.createSpyObj(mockedProductService, [
      'getAll',
    ]);
    mockedProductFacade = jasmine.createSpyObj(mockedProductFacade, [
      'setPendingState',
    ]);

    TestBed.configureTestingModule({
      providers: [
        ProductsEffect,
        {
          provide: Actions,
          useValue: mockedActions$,
        },
        {
          provide: ProductFacade,
          useValue: mockedProductFacade,
        },
        {
          provide: MessageService,
          useValue: mockedMessageService,
        },
        {
          provide: ToastService,
          useValue: mockedToastService,
        },
        {
          provide: ProductService,
          useValue: mockedProductService,
        },
      ],
    });

    effects = TestBed.inject(ProductsEffect);
  });

  describe('getAll$', (): void => {
    it('should call getAll and emit get Products Success', (done: DoneFn): void => {
      mockedProductService.getAll.and.returnValue(of([]));
      (<Observable<number>><unknown>effects.getAllProducts$)
        .pipe(take(1))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .subscribe((action: any): void => {
          console.log("action", action);
          expect(action.type).toEqual(ActionTypes.GetProductsSuccess);
          done();
        });

      actionsSubject.next(getProducts());

      expect(mockedProductService.getAll).toHaveBeenCalledTimes(1);
      expect(mockedProductService.getAll).toHaveBeenCalledWith();
    });

  });
});
