import { NgModule } from '@angular/core';

import { AuthGuard } from './auth.guard';
import { UserService } from './user.service';

@NgModule({
  imports: [],
  providers: [
    AuthGuard,
    UserService
  ]
})
export class CoreModule {}
