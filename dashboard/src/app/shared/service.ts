import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

import { error, json } from '../shared';

import 'rxjs/add/observable/throw';

const API = '/api';

export class Service<T> {

  constructor(protected authHttp: AuthHttp, protected endpoint: string) {}

  findAll(): Observable<T[] | Error> {
    return this.authHttp.get(`${API}/${this.endpoint}`)
      .map(json)
      .catch(error);
  }

  findById(id: number | string): Observable<T | Error> {
    return this.authHttp.get(`${API}/${this.endpoint}/${id}`)
      .map(json)
      .catch(error);
  }

}
