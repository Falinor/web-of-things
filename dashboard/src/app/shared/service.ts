import { Http } from '@angular/http';

export class Service<T> {

  constructor(protected http: Http) {}

  findAll() {
    // this.http.get()
  }

}
