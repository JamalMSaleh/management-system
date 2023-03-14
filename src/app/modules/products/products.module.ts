import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ProductsEffect } from './store/products.effect';
import { productsReducer } from './store/products.reducer';
import { ProductFacade } from './store/products.facade';
import { FormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { OrganizationsFacade } from '../organizations/store/organizations.facade';
import { OrdersFacade } from '../orders/store/orders.facade';
import { OrganizationsEffect } from '../organizations/store/organizations.effect';
import { OrdersEffect } from '../orders/store/orders.effect';
import { OrdersReducer } from '../orders/store/orders.reducer';
import { OrganizationsReducer } from '../organizations/store/organizations.reducer';
@NgModule({
  declarations: [
    ProductsComponent,
  ],
  imports: [
    ButtonModule,
    ProgressBarModule,
    InputTextModule,
    ToastModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    StoreModule.forFeature('Products', productsReducer),
    StoreModule.forFeature('Organizations', OrganizationsReducer),
    StoreModule.forFeature('Orders', OrdersReducer),
    EffectsModule.forFeature([ProductsEffect, OrganizationsEffect, OrdersEffect]),
    ProductsRoutingModule,
  ],
  providers: [ProductFacade, OrganizationsFacade, OrdersFacade],
})
export class ProductsModule { }
