import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './error/index';

const routes: Routes = [
  {
    path: '',
    children: []
  },
  { path: 'login', loadChildren: './auth/auth.module#AuthModule' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
