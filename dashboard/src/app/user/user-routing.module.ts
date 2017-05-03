import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewUserComponent } from './new-user';
import { UserListComponent } from './user-list';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'new', component: NewUserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
