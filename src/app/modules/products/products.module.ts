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
@NgModule({
  declarations: [
    ProductsComponent,
  ],
  imports: [
    ButtonModule,
    InputTextModule,
    ToastModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    StoreModule.forFeature('Products', productsReducer),
    EffectsModule.forFeature([ProductsEffect]),
    ProductsRoutingModule,
  ],
  providers: [ProductFacade],
})
export class ProductsModule { }
