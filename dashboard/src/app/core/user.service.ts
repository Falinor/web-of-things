import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { User } from './user.model';
import { Service } from '../shared/index';

// TODO(api): check if there is another way to pass API configuration
const ENDPOINT = 'users';

@Injectable()
export class UserService extends Service<User> {

  constructor(protected http: Http) {
    super(http, ENDPOINT);
  }

}
