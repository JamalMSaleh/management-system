import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { filter, Observable, Subscription } from 'rxjs';
import { PagesName } from 'src/app/shared/enums/pages-name';
import { Product } from '../products/shared/model/products.model';
import { ProductFacade } from '../products/store/products.facade';
import { OrganizationForm } from './shared/enums/organization-form';
import { OrganizationType } from './shared/enums/organization-type';
import { Organization, CreateOrganization } from './shared/model/organization.model';
import { OrganizationsFacade } from './store/organizations.facade';

@Component({
  selector: 'odd-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationsComponent implements OnInit, OnDestroy {
  organizationFormEnum: typeof OrganizationForm = OrganizationForm;
  organizations$: Observable<Organization[]> = this.organizationFacade.selectOrganizations$;
  products$: Observable<Product[]> = this.productFacade.selectProducts$;
  pending$: Observable<boolean> = this.organizationFacade.selectOrganizationsPending$;
  pageNameEnum: typeof PagesName = PagesName;
  organizationFormGroup!: FormGroup;
  organizationEditFormGroup!: FormGroup;
  subscriptions: Subscription = new Subscription();
  organizationTypes: string[] = [OrganizationType.Buyer, OrganizationType.Seller];
  organizationsData: Organization[] = [];
  productsData: Product[] = [];
  pendingState: boolean = false;
  clonedOrganizationData?: Organization;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly organizationFacade: OrganizationsFacade,
    private readonly productFacade: ProductFacade,
    private readonly ref: ChangeDetectorRef,
  ) { }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  ngOnInit(): void {
    this.organizationFacade.getOrganizations();
    this.productFacade.getProducts();
    this.initializeSubscriptions();
    this.initializeForm();
  }
  initializeSubscriptions(): void {
    this.subscriptions.add(this.organizations$.pipe(
      filter((organizations: Organization[]) => organizations.length > 0),
    ).subscribe((organizations: Organization[]) => {
      this.organizationsData = organizations !== undefined ? [...organizations] : [];
      console.log(this.organizationsData);
      this.ref.markForCheck();
    }));
    this.subscriptions.add(this.products$.subscribe((products: Product[]) => {
      this.productsData = products;
      this.ref.markForCheck();
    }));
    this.subscriptions.add(this.pending$.subscribe((state: boolean) => {
      this.pendingState = state;
      this.ref.markForCheck();
    }));
  }
  initializeForm(): void {
    this.organizationFormGroup = this.formBuilder.group({
      [this.organizationFormEnum.Name]: ['', [Validators.required]],
      [this.organizationFormEnum.Orders]: ['', [Validators.required]],
      [this.organizationFormEnum.Products]: ['', [Validators.required]],
      [this.organizationFormEnum.OrganizationType]: [OrganizationType.Buyer, [Validators.required]],
    });
    this.organizationEditFormGroup = this.formBuilder.group({
      [this.organizationFormEnum.Id]: ['', [Validators.required]],
      [this.organizationFormEnum.Name]: ['', [Validators.required]],
      [this.organizationFormEnum.Orders]: ['', [Validators.required]],
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
    this.organizationEditFormGroup.patchValue({ ...org });
  }
  onRowEditSave(): void {
    this.organizationFacade.updateOrganization(this.organizationEditFormGroup.value);
    this.organizationEditFormGroup.reset();
  }
  onRowEditCancel(): void {
    this.organizationEditFormGroup.reset();
  }
  onRowDelete(org: Organization): void {
    this.organizationFacade.deleteOrganization(<number>org.id);
  }
}
