import { ActionReducer } from '@ngrx/store';
import { OrdersState } from 'src/app/modules/orders/store/orders.state';
import { OrganizationsState } from 'src/app/modules/organizations/store/organizations.state';
import { ProductsState } from 'src/app/modules/products/store/products.state';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LazyModules {
  products: ProductsState;
  organizations: OrganizationsState;
  orders: OrdersState;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Shared {
}

export interface State extends LazyModules {
  shared: Shared;
}

export interface Reducers {
  shared: ActionReducer<Shared>;
}
