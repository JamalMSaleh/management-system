export interface CreateOrganization {
  name: string;
  organizationType: string;
  products: number[];
  orders: number[];
}
export interface Organization extends CreateOrganization {
  id?: number;
}
export interface PropsOrganizations {
  organizations: Organization[];
}
