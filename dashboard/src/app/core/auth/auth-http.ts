import { Http, RequestOptions } from '@angular/http';
import { AuthConfig, AuthHttp } from 'angular2-jwt';

export const TOKEN_NAME = 'WOT_AUTH_TOKEN';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [
      { 'Accept': 'application/json' },
      { 'Content-Type': 'application/json' }
    ],
    tokenName: TOKEN_NAME
  }), http, options);
}
