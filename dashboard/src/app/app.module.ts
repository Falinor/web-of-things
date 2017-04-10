import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { CoreModule } from './core';
import { DashboardModule } from './dashboard';
import { ErrorModule } from './error';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// TODO(remove)
import {Router} from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,

    CoreModule,
    DashboardModule,
    ErrorModule,
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
    console.log(`Routes: ${JSON.stringify(router.config, undefined, 2)}`);
  }
}
