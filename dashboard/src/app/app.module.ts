import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { Router } from '@angular/router';

import { CoreModule } from './core';
import { DashboardModule } from './dashboard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    MaterialModule,

    CoreModule,
    DashboardModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    if (!environment.production) {
      console.log(`Routes: ${JSON.stringify(router.config, undefined, 2)}`);
    }
  }
}
