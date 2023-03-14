import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription, filter, combineLatest, combineLatestAll, map, distinctUntilChanged } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PagesName } from 'src/app/shared/enums/pages-name';
import { Order, Product as OrderProduct } from '../orders/shared/model/order.model';
import { OrdersFacade } from '../orders/store/orders.facade';
import { Organization } from '../organizations/shared/model/organization.model';
import { OrganizationsFacade } from '../organizations/store/organizations.facade';
import { ErrorMessage } from './shared/enums/error-message';
import { ProductForm } from './shared/enums/product-form';
import { Product, CreateProduct } from './shared/model/products.model';
import { ProductFacade } from './store/products.facade';

@Component({
  selector: 'odd-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit, OnDestroy {
  productFormEnum: typeof ProductForm = ProductForm;
  pageNameEnum: typeof PagesName = PagesName;
  products$: Observable<Product[]> = this.productFacade.selectProducts$;
  organizations$: Observable<Organization[]> = this.organizationFacade.selectOrganizations$;
  orders$: Observable<Order[]> = this.ordersFacade.selectOrders$;
  pendingOrganization$: Observable<boolean> = this.organizationFacade.selectOrganizationsPending$;
  pendingOrder$: Observable<boolean> = this.ordersFacade.selectOrdersPending$;
  pendingProduct$: Observable<boolean> = this.productFacade.selectProductsPending$;
  productFormGroup!: FormGroup;
  productEditFormGroup!: FormGroup;
  subscriptions: Subscription = new Subscription();
  productsData: Product[] = [];
  organizationsData: Organization[] = [];
  ordersData: Order[] = [];
  pendingState: Observable<boolean> = new Observable();
  globalEditing: boolean = false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly productFacade: ProductFacade,
    private readonly organizationFacade: OrganizationsFacade,
    private readonly ordersFacade: OrdersFacade,
    private readonly ref: ChangeDetectorRef,
    private readonly toastService: ToastService,
  ) { }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  ngOnInit(): void {
    this.productFacade.getProducts();
    this.organizationFacade.getOrganizations();
    this.ordersFacade.getOrders();
    this.initializeSubscriptions();
    this.initializeForm();
  }
  initializeSubscriptions(): void {
    this.subscriptions.add(this.products$.subscribe((products?: Product[]) => {
      this.productsData = products !== undefined ? [...products] : [];
      this.ref.markForCheck();
    }));
    this.subscriptions.add(this.orders$.pipe(
      filter((orders: Order[]) => orders.length > 0),
    ).subscribe((orders?: Order[]) => {
      this.ordersData = orders !== undefined ? [...orders] : [];
      this.ref.markForCheck();
    }));
    this.subscriptions.add(this.organizations$.pipe(
      filter((organization: Organization[]) => organization.length > 0),
    ).subscribe((organization?: Organization[]) => {
      this.organizationsData = organization !== undefined ? [...organization] : [];
      this.ref.markForCheck();
    }));
    this.pendingState = combineLatest([this.pendingOrder$, this.pendingOrganization$, this.pendingProduct$]).pipe(map(([a, b, c]: boolean[]) => a || b || c),
      distinctUntilChanged(),
    );
  }
  initializeForm(): void {
    this.productFormGroup = this.formBuilder.group({
      [this.productFormEnum.Category]: ['', [Validators.required]],
      [this.productFormEnum.Packaging]: ['', [Validators.required]],
      [this.productFormEnum.Variety]: ['', [Validators.required]],
    });
    this.productEditFormGroup = this.formBuilder.group({
      [this.productFormEnum.Id]: ['', [Validators.required]],
      [this.productFormEnum.Category]: ['', [Validators.required]],
      [this.productFormEnum.Packaging]: ['', [Validators.required]],
      [this.productFormEnum.Variety]: ['', [Validators.required]],
    });
  }
  addProduct(): void {
    if (this.productFormGroup.valid) {
      const product: CreateProduct = this.productFormGroup.value;
      this.productFacade.addProduct(product);
    }
  }
  onRowEditInit(product: Product): void {
    this.globalEditing = true;
    this.productEditFormGroup.patchValue({
      ...product,
    });
  }
  onRowEditSave(): void {
    this.globalEditing = false;
    this.productFacade.updateProduct(this.productEditFormGroup.value);
    this.productEditFormGroup.reset();
  }
  onRowEditCancel(): void {
    this.globalEditing = false;
    this.productEditFormGroup.reset();
  }
  onRowDelete(product: Product): void {
    this.globalEditing = false;
    if (this.checkDeleteDependencyValidity(<number>product.id)) {
      this.productFacade.deleteProduct(<number>product.id);
    }
  }
  //improvement: in these organizations add a link in the message to which organization or order it belongs with its ID
  checkDeleteDependencyValidity(id: number): boolean {
    const organizationState: boolean = this.organizationsData.some((organization: Organization) => organization.products.includes(id));
    const orderState: boolean = this.ordersData.some((order: Order) => (order.products.some((product: OrderProduct) => product.id === id)));
    if (organizationState || orderState) {
      this.toastService.addWarnMessage(ErrorMessage.ProductNotDeletable);
      return false;
    }
    return true;
  }
}
