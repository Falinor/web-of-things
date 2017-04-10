import { NgModule } from '@angular/core';

import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [],
  providers: [AuthGuard]
})
export class CoreModule {}
