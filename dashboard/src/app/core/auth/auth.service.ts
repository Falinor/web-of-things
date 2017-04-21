import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

import { encode } from './basic';
import { error, json } from '../../shared';
import { User } from '../user/user.model';

import { TOKEN_NAME } from './auth-http';

@Injectable()
export class AuthService {
  user: User;
  redirectUrl: string;

  constructor(private http: Http, private requestOptions: RequestOptions) {}

  isLoggedIn(): boolean {
    return tokenNotExpired(TOKEN_NAME);
  }

  logIn(email: string, password: string, key: string): Observable<User | Error> {
    const payload = { access_token: key };
    const auth = encode(email, password);
    this.requestOptions.headers.append('Authorization', auth);
    return this.http.post('/api/auth', payload, this.requestOptions)
      .map(json)
      .do(this.saveToken)
      .catch(error);
  }

  private saveToken(result: UserWithToken): void {
    localStorage.setItem(TOKEN_NAME, result.token);
  }

}

class UserWithToken {
  token?: string;
  user?: User;
}
