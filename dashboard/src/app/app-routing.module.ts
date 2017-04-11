import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'users', loadChildren: './user/user.module#UserModule' },
  { path: 'login', loadChildren: './auth/auth.module#AuthModule' },
  { path: '**', loadChildren: './error/error.module#ErrorModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
