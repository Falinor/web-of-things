import { Http, RequestOptions } from '@angular/http';
import { AuthConfig, AuthHttp } from 'angular2-jwt';

export const tokenName = 'access_token';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [
      { 'Accept': 'application/json' },
      { 'Content-Type': 'application/json' }
    ],
    tokenName: tokenName
  }), http, options);
}
