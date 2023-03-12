import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { dbConfig } from 'src/database-config';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { getInitialState, reducerToken, REDUCER_PROVIDER } from './app.store';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    EffectsModule.forRoot(),
    StoreModule.forRoot(reducerToken, { initialState: getInitialState }),
    StoreDevtoolsModule.instrument({
      maxAge: 30,
    }),
  ],
  providers: [REDUCER_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule { }
