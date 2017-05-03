import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: './user/user.module#UserModule',
    canActivate: [/*AuthGuard*/]
  },
  { path: 'login', loadChildren: './auth/auth.module#AuthModule' },
  { path: '**', loadChildren: './error/error.module#ErrorModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
