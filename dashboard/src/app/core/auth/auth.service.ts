import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

import { error, json } from '../../shared';
import { User } from '../user.model';

@Injectable()
export class AuthService {
  user: User;
  redirectUrl: string;

  constructor(private http: Http) {}

  isLoggedIn(): boolean {
    return tokenNotExpired();
  }

  logIn(email: string, password: string): Observable<User | Error> {
    const masterKey = 'yhJys5W1YMGGrkJkP6R3hEUcyRqvdz5B';
    return this.http.post('/api/auth', { email, password, masterKey })
      .map(json)
      .do(this.saveToken)
      .catch(error);
  }

  private saveToken(result: UserWithToken): void {
    // TODO: do something with result
  }

}

class UserWithToken {
  token?: string;
  user?: User;
}
