import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export function error(err: Response | Error): Observable<Error> {
  //  TODO: handle and log error
  if (err instanceof Response) {
    err = new Error(err.statusText);
  }
  return Observable.throw(err);
}

export function json<T>(res: Response): T | T[] | {} {
  if (!res.ok) {
    throw new Error(`${res.status} - ${res.statusText}`);
  }
  return res.json() || {};
}
