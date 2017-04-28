import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { FacebookService, InitParams } from 'ngx-facebook';

import { User } from './user.model';
import { Service } from '../../shared/index';

// TODO(api): check if there is another way to pass API configuration
const ENDPOINT = 'users';

@Injectable()
export class UserService extends Service<User> {

  constructor(protected authHttp: AuthHttp,
              private fbService: FacebookService) {
    super(authHttp, ENDPOINT);
    const fbParams: InitParams = {
      // TODO
    };
  }

  getFacebookFriends() {

  }

}
