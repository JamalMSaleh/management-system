import { Organization } from "../shared/models/organization.model";

export interface OrganizationsState {
  organizations: Organization[];
  pending: boolean;
}
