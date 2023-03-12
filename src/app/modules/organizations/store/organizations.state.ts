import { Organization } from "../shared/model/organization.model";

export interface OrganizationsState {
  organizations: Organization[];
  pending: boolean;
}
