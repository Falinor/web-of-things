import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { User } from './user.model';
import { Service } from '../../shared/index';

@Injectable()
export class UserService extends Service<User> {

  constructor(protected http: Http) {
    super(http);
  }

}
