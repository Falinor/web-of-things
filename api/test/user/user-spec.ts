import { expect } from 'chai';
import * as supertest from 'supertest';

import { app, User } from '../../src/index';

const request = supertest(app);

describe('User API', () => {

  describe('GET /users', () => {
    it('should return a list of authorized users', () => {
      return request
        .get('/users')
        .set('Accept', 'application/json')
        .expect(200)
        .then((response: supertest.Response) => {
          expect(response.body.length).to.be.greaterThan(0);
        });
    });
  });

  describe('GET /users/:id', () => {
    it('should return a single user', () => {
      const id = '1'; // TODO(fix): real id
      return request
        .get(`/users/${id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .then((response: supertest.Response) => {
          expect(response.body).not.to.be.undefined;
        });
    });
  });

  describe('POST /users', () => {
    it('should create an user and return 201', () => {
      // TODO
    });
  });
});
