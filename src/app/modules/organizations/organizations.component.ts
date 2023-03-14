import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { combineLatest, distinctUntilChanged, filter, map, Observable, Subscription } from 'rxjs';
import { PagesName } from 'src/app/shared/enums/pages-name';
import { OrdersFacade } from '../orders/store/orders.facade';
import { Product } from '../products/shared/model/products.model';
import { ProductFacade } from '../products/store/products.facade';
import { OrganizationForm } from './shared/enums/organization-form';
import { OrganizationType } from './shared/enums/organization-type';
import { Organization, CreateOrganization } from './shared/model/organization.model';
import { OrganizationsFacade } from './store/organizations.facade';
import { Order, Product as OrderProduct } from '../orders/shared/model/order.model';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ErrorMessage } from './shared/enums/error-messages.enum';

@Component({
  selector: 'odd-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationsComponent implements OnInit, OnDestroy {
  organizationFormEnum: typeof OrganizationForm = OrganizationForm;
  products$: Observable<Product[]> = this.productFacade.selectProducts$;
  organizations$: Observable<Organization[]> = this.organizationFacade.selectOrganizations$;
  orders$: Observable<Order[]> = this.ordersFacade.selectOrders$;
  pendingOrganization$: Observable<boolean> = this.organizationFacade.selectOrganizationsPending$;
  pendingOrder$: Observable<boolean> = this.ordersFacade.selectOrdersPending$;
  pendingProduct$: Observable<boolean> = this.productFacade.selectProductsPending$;
  pageNameEnum: typeof PagesName = PagesName;
  organizationFormGroup!: FormGroup;
  organizationEditFormGroup!: FormGroup;
  subscriptions: Subscription = new Subscription();
  organizationTypes: string[] = [OrganizationType.Buyer, OrganizationType.Seller];
  organizationsData: Organization[] = [];
  productsData: Product[] = [];
  pendingState: Observable<boolean> = new Observable();
  ordersData: Order[] = [];
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
    this.subscriptions.add(this.orders$.pipe(
      filter((orders: Order[]) => orders.length > 0),
    ).subscribe((orders?: Order[]) => {
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
    this.organizationFormGroup = this.formBuilder.group({
      [this.organizationFormEnum.Name]: ['', [Validators.required]],
      [this.organizationFormEnum.Orders]: ['', []],
      [this.organizationFormEnum.Products]: ['', [Validators.required]],
      [this.organizationFormEnum.OrganizationType]: [OrganizationType.Buyer, [Validators.required]],
    });
    this.organizationEditFormGroup = this.formBuilder.group({
      [this.organizationFormEnum.Id]: ['', [Validators.required]],
      [this.organizationFormEnum.Name]: ['', [Validators.required]],
      [this.organizationFormEnum.Orders]: ['', []],
      [this.organizationFormEnum.Products]: ['', [Validators.required]],
      [this.organizationFormEnum.OrganizationType]: ['', [Validators.required]],
    });
  }

  addOrganization(): void {
    if (this.organizationFormGroup.valid) {
      const organization: CreateOrganization = this.organizationFormGroup.value;
      this.organizationFacade.addOrganization(organization);
    }
  }
  onRowEditInit(org: Organization): void {
    this.globalEditing = true;
    this.organizationEditFormGroup.patchValue({ ...org });
  }
  onRowEditSave(): void {
    this.globalEditing = false;
    this.organizationFacade.updateOrganization(this.organizationEditFormGroup.value);
    this.organizationEditFormGroup.reset();
  }
  onRowEditCancel(): void {
    this.globalEditing = false;
    this.organizationEditFormGroup.reset();
  }
  onRowDelete(org: Organization): void {
    this.globalEditing = false;
    if (this.checkDeleteDependencyValidity(<number>org.id)) {
      this.organizationFacade.deleteOrganization(<number>org.id);
    }
  }
  checkDeleteDependencyValidity(id: number): boolean {
    const orderState: boolean = this.ordersData.some((order: Order) => (order.organization === id));
    if (orderState) {
      this.toastService.addWarnMessage(ErrorMessage.OrganizationNotDeletable);
      return false;
    }
    return true;
  }
}
