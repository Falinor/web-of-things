import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export function error(err: Error): Observable<Error> {
  //  TODO: handle and log error
  return Observable.throw(err);
}

export function json<T>(res: Response): T | T[] | {} {
  if (!res.ok) {
    throw new Error(`${res.status} - ${res.statusText}`);
  }
  return res.json() || {};
}
