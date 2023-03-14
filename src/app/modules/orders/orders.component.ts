import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest, distinctUntilChanged, filter, map, Observable, Subscription } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PagesName } from 'src/app/shared/enums/pages-name';
import { OrganizationType } from '../organizations/shared/enums/organization-type';
import { Organization } from '../organizations/shared/model/organization.model';
import { OrganizationsFacade } from '../organizations/store/organizations.facade';
import { Product } from '../products/shared/model/products.model';
import { ProductFacade } from '../products/store/products.facade';
import { ErrorMessage } from './shared/enums/error-message.enum';
import { OrderForm, OrderProductForm } from './shared/enums/order-form.enum';
import { OrderTypes } from './shared/enums/order-types.enum';
import { Product as OrderProduct, Order, CreateOrder } from './shared/model/order.model';
import { OrdersFacade } from './store/orders.facade';

@Component({
  selector: 'odd-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent implements OnInit, OnDestroy {
  orderFormEnum: typeof OrderForm = OrderForm;
  orderProductFormEnum: typeof OrderProductForm = OrderProductForm;
  pageNameEnum: typeof PagesName = PagesName;
  products$: Observable<Product[]> = this.productFacade.selectProducts$;
  organizations$: Observable<Organization[]> = this.organizationFacade.selectOrganizations$;
  orders$: Observable<Order[]> = this.ordersFacade.selectOrders$;
  pendingOrganization$: Observable<boolean> = this.organizationFacade.selectOrganizationsPending$;
  pendingOrder$: Observable<boolean> = this.ordersFacade.selectOrdersPending$;
  pendingProduct$: Observable<boolean> = this.productFacade.selectProductsPending$;
  orderFormGroup!: FormGroup;
  orderEditFormGroup!: FormGroup;
  orderProductFormGroup!: FormGroup;
  subscriptions: Subscription = new Subscription();
  orderTypes: string[] = [OrderTypes.Buy, OrderTypes.Sell];
  organizationsData: Organization[] = [];
  productsData: Product[] = [];
  pendingState: Observable<boolean> = new Observable();
  ordersData: Order[] = [];
  currentProductsList: OrderProduct[] = [];
  showReplace: boolean = false;
  orderTypesEnum: typeof OrderTypes = OrderTypes;
  globalEditing: boolean = false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly organizationFacade: OrganizationsFacade,
    private readonly productFacade: ProductFacade,
    private readonly ordersFacade: OrdersFacade,
    private readonly ref: ChangeDetectorRef,
    private readonly toastService: ToastService,
  ) { }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  ngOnInit(): void {
    this.organizationFacade.getOrganizations();
    this.productFacade.getProducts();
    this.ordersFacade.getOrders();
    this.initializeSubscriptions();
    this.initializeForm();
  }
  initializeSubscriptions(): void {
    this.subscriptions.add(this.products$.pipe(
      filter((products: Product[]) => products.length > 0),
    ).subscribe((products?: Product[]) => {
      this.productsData = products !== undefined ? [...products] : [];
      this.ref.markForCheck();
    }));
    this.subscriptions.add(this.orders$.subscribe((orders?: Order[]) => {
      this.ordersData = orders !== undefined ? [...orders] : [];
      this.ref.markForCheck();
    }));
    this.subscriptions.add(this.organizations$.subscribe((organization?: Organization[]) => {
      this.organizationsData = organization !== undefined ? [...organization] : [];
      this.ref.markForCheck();
    }));
    this.pendingState = combineLatest([this.pendingOrder$, this.pendingOrganization$, this.pendingProduct$]).pipe(map(([a, b, c]: boolean[]) => a || b || c),
      distinctUntilChanged(),
    );
  }
  initializeForm(): void {
    this.orderProductFormGroup = this.formBuilder.group({
      [this.orderProductFormEnum.Id]: [0, [Validators.required]],
      [this.orderProductFormEnum.Volume]: ['', [Validators.required]],
      [this.orderProductFormEnum.UnitPrice]: ['', [Validators.required]],
    });
    this.orderFormGroup = this.formBuilder.group({
      [this.orderFormEnum.Organization]: ['', []],
      [this.orderFormEnum.OrderType]: [OrderTypes.Buy, [Validators.required]],
    });
    this.orderEditFormGroup = this.formBuilder.group({
      [this.orderFormEnum.Id]: ['', [Validators.required]],
      [this.orderFormEnum.Organization]: ['', []],
      [this.orderFormEnum.OrderType]: ['', [Validators.required]],
    });
  }
  addOrder(): void {
    if (this.orderFormGroup.valid && this.currentProductsList.length > 0) {
      const order: CreateOrder = this.orderFormGroup.value;
      order.products = this.currentProductsList;
      this.ordersFacade.addOrder(order);
      this.currentProductsList = [];
    } else {
      this.toastService.addWarnMessage(ErrorMessage.CannotEdit);
    }
  }
  onRowEditInit(order: Order): void {
    this.orderEditFormGroup.patchValue({
      ...order,
    });
    this.currentProductsList = [...order.products];
    this.globalEditing = true;
  }
  onRowEditSave(): void {
    if (this.orderEditFormGroup.valid && this.currentProductsList.length > 0) {
      const order: Order = this.orderEditFormGroup.value;
      order.products = this.currentProductsList;
      this.ordersFacade.updateOrder(order);
      this.orderEditFormGroup.reset();
      this.currentProductsList = [];
    } else {
      this.toastService.addWarnMessage(ErrorMessage.CannotEdit);
    }
    this.globalEditing = false;
  }
  onRowEditCancel(): void {
    this.globalEditing = false;
    this.currentProductsList = [];
    this.orderEditFormGroup.reset();
  }
  onRowDelete(order: Product): void {
    this.globalEditing = false;
    this.currentProductsList = [];
    this.ordersFacade.deleteOrder(<number>order.id);
  }
  addProduct(): void {
    if (this.orderProductFormGroup.valid) {
      const order: OrderProduct = this.orderProductFormGroup.value;
      this.currentProductsList.push(order);
      this.ref.markForCheck();
    }
  }
  onDeleteProduct(index: number): void {
    this.currentProductsList.splice(index, 1);
    this.ref.markForCheck();
  }
  onRowReplace(order: Order): void {
    this.orderFormGroup.patchValue({
      ...order,
      orderType: OrderTypes.Sell,
    });
    this.currentProductsList = order.products;
    this.ref.markForCheck();
  }
  onOrderTypeChange(): void {
    const order: CreateOrder = this.orderFormGroup.value;
    this.showReplace = order.orderType === OrderTypes.Sell ? true : false;
  }
}
