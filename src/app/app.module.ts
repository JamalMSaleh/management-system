import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { MessageService } from 'primeng/api';
import { dbConfig } from 'src/database-config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { getInitialState, reducerToken, REDUCER_PROVIDER } from './app.store';
import { ToastModule } from 'primeng/toast';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    LandingPageComponent,
    BrowserModule,
    AppRoutingModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    EffectsModule.forRoot(),
    StoreModule.forRoot(reducerToken, { initialState: getInitialState }),
    StoreDevtoolsModule.instrument({
      maxAge: 30,
    }),
    BrowserAnimationsModule,
    ToastModule,

  ],
  providers: [REDUCER_PROVIDER, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule { }
