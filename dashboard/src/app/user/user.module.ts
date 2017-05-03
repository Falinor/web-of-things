import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { NewUserComponent } from './new-user';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    UserRoutingModule
  ],
  declarations: [
    NewUserComponent,
    UserListComponent
  ]
})
export class UserModule {}
