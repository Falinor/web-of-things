import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // TODO: remove
    return true;
    /*
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.authService.redirectUrl = state.url;
      this.router.navigate(['/login'])
        .then(() => {
          // TODO(snackbar): display a message
        });
    }
    return false;
    */
  }

}
