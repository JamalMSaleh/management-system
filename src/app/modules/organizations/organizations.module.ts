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

@NgModule({
  declarations: [
    OrganizationsComponent,
  ],
  imports: [
    ButtonModule,
    InputTextModule,
    TableModule,
    CommonModule,
    StoreModule.forFeature('Organizations', OrganizationsReducer),
    StoreModule.forFeature('Products', productsReducer),
    EffectsModule.forFeature([OrganizationsEffect, ProductsEffect]),
    OrganizationsRoutingModule,
  ],
})
export class OrganizationsModule { }
