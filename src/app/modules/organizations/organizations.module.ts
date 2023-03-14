import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationsComponent } from './organizations.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffect } from '../products/store/products.effect';
import { productsReducer } from '../products/store/products.reducer';
import { OrganizationsEffect } from './store/organizations.effect';
import { OrganizationsReducer } from './store/organizations.reducer';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrganizationsFacade } from './store/organizations.facade';
import { ProductFacade } from '../products/store/products.facade';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrdersFacade } from '../orders/store/orders.facade';
import { OrdersEffect } from '../orders/store/orders.effect';
import { OrdersReducer } from '../orders/store/orders.reducer';
@NgModule({
  declarations: [
    OrganizationsComponent,
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
    OrganizationsRoutingModule,
  ],
  providers: [OrganizationsFacade, ProductFacade, OrdersFacade],
})
export class OrganizationsModule { }
