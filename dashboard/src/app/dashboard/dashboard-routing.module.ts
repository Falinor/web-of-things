import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        // TODO: user here
      }
    ]
  },
  { path: 'users', loadChildren: 'app/user/user.module#UserModule', outlet: 'dash' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
