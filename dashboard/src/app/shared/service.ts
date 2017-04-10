import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';

const API = '/api';

export class Service<T> {

  constructor(protected http: Http, protected endpoint: string) {}

  findAll(): Observable<T[]> {
    return this.http.get(`${API}/${this.endpoint}`)
      .map(this.json)
      .catch(this.error);
  }

  findById(id: number | string): Observable<T> {
    return this.http.get(`${API}/${this.endpoint}/${id}`)
      .map(this.json)
      .catch(this.error);
  }

  private error(err: Error): any {
    return Observable.throw(err);
  }

  private json(res: Response): T | T[] {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json() || {};
  }

}
