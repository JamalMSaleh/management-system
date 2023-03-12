import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import {ButtonModule} from 'primeng/button';
@NgModule({
  declarations: [
    LandingPageComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    LandingPageRoutingModule,
  ],
})
export class LandingPageModule { }
