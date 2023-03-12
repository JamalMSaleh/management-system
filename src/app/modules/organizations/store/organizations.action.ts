import { createAction, props } from "@ngrx/store";
import { ActionCreatorPropsType, ActionCreatorType } from "src/app/shared/types/action.types";
import { ActionTypes } from "../shared/enums/action-types";
import { Organization, CreateOrganization, PropsOrganizations } from "../shared/model/organization.model";

//this is needed since organization has a field called type

//get Organizations
export const getOrganizations: ActionCreatorType<ActionTypes.GetOrganizations> = createAction(ActionTypes.GetOrganizations);
export const getOrganizationsSuccess: ActionCreatorPropsType<ActionTypes.GetOrganizationsSuccess, PropsOrganizations> = createAction(ActionTypes.GetOrganizationsSuccess, props<PropsOrganizations>());
export const getOrganizationsError: ActionCreatorType<ActionTypes.GetOrganizationsError> = createAction(ActionTypes.GetOrganizationsError);

//get Organization
export const getOrganization: ActionCreatorPropsType<ActionTypes.GetOrganization, { id: number }> = createAction(ActionTypes.GetOrganization, props<{ id: number }>());
export const getOrganizationSuccess: ActionCreatorPropsType<ActionTypes.GetOrganizationSuccess, { organization: Organization }> = createAction(
  ActionTypes.GetOrganizationSuccess,
  props<{ organization: Organization }>(),
);
export const getOrganizationError: ActionCreatorType<ActionTypes.GetOrganizationError> = createAction(ActionTypes.GetOrganizationError);

//update Organization
export const updateOrganization: ActionCreatorPropsType<ActionTypes.UpdateOrganization, CreateOrganization> = createAction(ActionTypes.UpdateOrganization, props<CreateOrganization>());
export const updateOrganizationSuccess: ActionCreatorPropsType<ActionTypes.UpdateOrganizationSuccess, Organization> = createAction(
  ActionTypes.UpdateOrganizationSuccess,
  props<Organization>(),
);
export const updateOrganizationError: ActionCreatorType<ActionTypes.UpdateOrganizationError> = createAction(ActionTypes.UpdateOrganizationError);

//delete Organization
export const deleteOrganization: ActionCreatorPropsType<ActionTypes.DeleteOrganization, { id: number }> = createAction(
  ActionTypes.DeleteOrganization,
  props<{ id: number }>(),
);
export const deleteOrganizationSuccess: ActionCreatorPropsType<ActionTypes.DeleteOrganizationSuccess, PropsOrganizations> = createAction(
  ActionTypes.DeleteOrganizationSuccess,
  props<PropsOrganizations>(),
);
export const deleteOrganizationError: ActionCreatorType<ActionTypes.DeleteOrganizationError> = createAction(ActionTypes.DeleteOrganizationError);

//post Organization
export const postOrganization: ActionCreatorPropsType<ActionTypes.PostOrganization, { organization: CreateOrganization }> = createAction(
  ActionTypes.PostOrganization,
  props<{ organization: CreateOrganization }>(),
);
export const postOrganizationSuccess: ActionCreatorPropsType<ActionTypes.PostOrganizationSuccess, Organization> = createAction(
  ActionTypes.PostOrganizationSuccess,
  props<Organization>(),
);
export const postOrganizationError: ActionCreatorType<ActionTypes.PostOrganizationError> = createAction(ActionTypes.PostOrganizationError);
