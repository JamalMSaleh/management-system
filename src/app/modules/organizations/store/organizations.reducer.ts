import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { OrganizationsState } from "./organizations.state";
import { deleteOrganization, deleteOrganizationSuccess, getOrganizations, getOrganizationsSuccess, postOrganization, postOrganizationSuccess, PropsOrganizations, updateOrganization, updateOrganizationSuccess } from "./organizations.action";
import { Organization } from "../shared/model/organization.model";

export const organizationsInitialState: OrganizationsState = {
  organizations: [],
  pending: false,
};
export const OrganizationsReducer: ActionReducer<OrganizationsState, Action> =
  createReducer(
    organizationsInitialState,
    on(getOrganizations, (state: OrganizationsState) => ({
      ...state,
      pending: true,
    })),
    on(getOrganizationsSuccess, (state: OrganizationsState, { organizations }: PropsOrganizations) => ({
      ...state,
      Organizations: organizations,
      pending: false,
    })),
    on(postOrganization, (state: OrganizationsState) => (
      { ...state, pending: true }
    )),
    on(postOrganizationSuccess, (state: OrganizationsState, organization: Organization) => {
      const newOrganizationsState: Organization[] = [...state.organizations, organization];
      return { ...state, Organizations: newOrganizationsState, pending: false };
    }),
    on(updateOrganization, (state: OrganizationsState) => ({
      ...state,
      pending: true,
    })),
    on(updateOrganizationSuccess, (state: OrganizationsState, organization: Organization) => {
      const newOrganizationsState: Organization[] = state.organizations.filter(
        (_: Organization) => _.id !== organization.id,
      );
      newOrganizationsState.push(organization);
      const newState: OrganizationsState = { ...state, organizations: newOrganizationsState, pending: false };
      return newState;
    }),
    on(deleteOrganization, (state: OrganizationsState) => ({ ...state, pending: true })),

    on(deleteOrganizationSuccess, (state: OrganizationsState, { organizations }: PropsOrganizations) => ({
      ...state,
      organizations,
      pending: false,
    })),
  );
