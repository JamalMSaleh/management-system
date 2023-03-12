import { createFeatureSelector, createSelector, DefaultProjectorFn, MemoizedSelector } from "@ngrx/store";
import { Organization } from "../shared/model/organization.model";
import { OrganizationsState } from "./organizations.state";

export const selectOrganizationsFeature: MemoizedSelector<
  object,
  OrganizationsState,
  DefaultProjectorFn<OrganizationsState>
> = createFeatureSelector<OrganizationsState>('Organizations');

export const selectOrganizationsPending: MemoizedSelector<
  object,
  boolean,
  DefaultProjectorFn<boolean>
> = createSelector(
  selectOrganizationsFeature,
  (state: OrganizationsState) => state.pending,
);
export const selectOrganizations: MemoizedSelector<
  object,
  Organization[],
  DefaultProjectorFn<Organization[]>
> = createSelector(
  selectOrganizationsFeature,
  (state: OrganizationsState) => state.organizations,
);
