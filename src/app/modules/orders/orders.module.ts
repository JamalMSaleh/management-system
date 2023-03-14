import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { OrganizationsEffect } from '../organizations/store/organizations.effect';
import { OrganizationsReducer } from '../organizations/store/organizations.reducer';
import { ProductsEffect } from '../products/store/products.effect';
import { productsReducer } from '../products/store/products.reducer';
import { OrdersEffect } from './store/orders.effect';
import { OrdersReducer } from './store/orders.reducer';
import { OrganizationsFacade } from '../organizations/store/organizations.facade';
import { ProductFacade } from '../products/store/products.facade';
import { OrdersFacade } from './store/orders.facade';

@NgModule({
  declarations: [
    OrdersComponent,
  ],
  imports: [
    ButtonModule,
    MultiSelectModule,
    DropdownModule,
    ProgressBarModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    CommonModule,
    StoreModule.forFeature('Organizations', OrganizationsReducer),
    StoreModule.forFeature('Products', productsReducer),
    StoreModule.forFeature('Orders', OrdersReducer),
    EffectsModule.forFeature([OrganizationsEffect, ProductsEffect, OrdersEffect]),
    OrdersRoutingModule,
  ],
  providers: [OrganizationsFacade, ProductFacade, OrdersFacade],
})
export class OrdersModule { }
