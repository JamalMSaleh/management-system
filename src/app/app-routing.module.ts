/* eslint-disable @typescript-eslint/typedef */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'landingPage' },
  { path: 'products', loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule) },
  { path: 'landingPage', loadComponent: () => import('./modules/landing-page/landing-page.component').then(c => c.LandingPageComponent) },
  { path: 'organizations', loadChildren: () => import('./modules/organizations/organizations.module').then(m => m.OrganizationsModule) },
  { path: 'orders', loadChildren: () => import('./modules/orders/orders.module').then(m => m.OrdersModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
