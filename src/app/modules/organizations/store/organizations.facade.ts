import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectOrganizations, selectOrganizationsPending } from "./organizations.selector";
import { deleteOrganization, getOrganization, getOrganizations, postOrganization, updateOrganization } from './organizations.action';
import { Injectable } from "@angular/core";
import { Organization, CreateOrganization } from "../shared/model/organization.model";
@Injectable()
export class OrganizationsFacade {
  public selectOrganizationsPending$: Observable<boolean> = this.store.pipe(select(selectOrganizationsPending));
  public selectOrganizations$: Observable<Organization[]> = this.store.pipe(select(selectOrganizations));

  constructor(private readonly store: Store) { }

  public getOrganizations(): void {
    this.store.dispatch(getOrganizations());
  }
  public getOrganization(id: number): void {
    this.store.dispatch(getOrganization({ id }));
  }
  public deleteOrganization(id: number): void {
    this.store.dispatch(deleteOrganization({ id }));
  }
  public addOrganization(organization: CreateOrganization): void {
    this.store.dispatch(postOrganization({ organization }));
  }
  public updateOrganization(organization: Organization): void {
    this.store.dispatch(updateOrganization(organization));
  }
}
