import { expect } from 'chai';
import * as supertest from 'supertest';

import { app } from '../../src/app';

const request = supertest(app);

describe('User API', () => {

  describe('GET /users', () => {
    it('should return a list of authorized users', () => {
      return request
        .get('/users')
        .set('Accept', 'application/json')
        .expect(200)
        .then((response: supertest.Response) => {
          expect(response.body.email).to.equal('foo');
        });
    });
  });
});
