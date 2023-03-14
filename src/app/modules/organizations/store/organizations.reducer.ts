import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { OrganizationsState } from "./organizations.state";
import { deleteOrganization, deleteOrganizationSuccess, getOrganizations, getOrganizationsSuccess, postOrganization, postOrganizationSuccess, updateOrganization, updateOrganizationSuccess } from "./organizations.action";
import { Organization, PropsOrganizations } from "../shared/model/organization.model";

export const organizationsInitialState: OrganizationsState = {
  organizations: [],
  pending: false,
};
export const OrganizationsReducer: ActionReducer<OrganizationsState, Action> =
  createReducer(
    organizationsInitialState,
    on(getOrganizations, postOrganization, updateOrganization, deleteOrganization, (state: OrganizationsState) => ({
      ...state,
      pending: true,
    })),
    on(getOrganizationsSuccess, (state: OrganizationsState, { organizations }: PropsOrganizations) => ({
      ...state,
      organizations,
      pending: false,
    })),

    on(postOrganizationSuccess, (state: OrganizationsState, organization: Organization) => {
      const newOrganizationsState: Organization[] = [...state.organizations, organization];
      return { ...state, organizations: newOrganizationsState, pending: false };
    }),

    on(updateOrganizationSuccess, (state: OrganizationsState, organization: Organization) => {
      const newOrganizationsState: Organization[] = state.organizations.filter(
        (_: Organization) => _.id !== organization.id,
      );
      newOrganizationsState.push(organization);
      const newState: OrganizationsState = { ...state, organizations: newOrganizationsState, pending: false };
      return newState;
    }),

    on(deleteOrganizationSuccess, (state: OrganizationsState, { organizations }: PropsOrganizations) => ({
      ...state,
      organizations,
      pending: false,
    })),
  );
