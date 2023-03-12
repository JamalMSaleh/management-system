import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { OrganizationForm } from './shared/enums/organization-form';
import { Organization, CreateOrganization } from './shared/model/organization.model';
import { OrganizationsFacade } from './store/organizations.facade';

@Component({
  selector: 'odd-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationsComponent implements OnInit, OnDestroy {
  public organizationFormEnum: typeof OrganizationForm = OrganizationForm;
  organizations$: Observable<Organization[]> = this.organizationFacade.selectOrganizations$;
  public organizationFormGroup!: FormGroup;
  subscriptions: Subscription = new Subscription();

  organizationsData: Organization[] = [];
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly organizationFacade: OrganizationsFacade,
    private readonly ref: ChangeDetectorRef,
  ) { }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  ngOnInit(): void {
    this.getAllOrganizations();
    this.subscriptions.add(this.organizations$.subscribe((organizations: Organization[]) => {
      this.organizationsData = organizations;
      console.log(this.organizationsData);
      this.ref.markForCheck();
    }));
    this.initializeForm();
  }
  initializeForm(): void {
    this.organizationFormGroup = this.formBuilder.group({
      [this.organizationFormEnum.Name]: new FormControl('', Validators.required),
      [this.organizationFormEnum.Orders]: new FormControl(
        '',
        Validators.required,
      ),
      [this.organizationFormEnum.Products]: new FormControl('', Validators.required),
      [this.organizationFormEnum.Type]: new FormControl('', Validators.required),
    });
  }
  getAllOrganizations(): void {
    this.organizationFacade.getOrganizations();

  }
  addOrganization(): void {
    if (this.organizationFormGroup.valid) {
      const organization: CreateOrganization = this.organizationFormGroup.value;
      this.organizationFacade.addOrganization(organization);
    }
  }
}
