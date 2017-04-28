import request from 'supertest';
import { stub } from 'sinon';

import { User } from '../user';
import express from '../../services/express';
import { verify } from '../../services/jwt';
import * as passport from '../../services/passport/google';
import config from '../../config';
import routes from './index';

const app = () => express(routes);

let user;

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '12345678' });
});

test('POST /auth 201 (master)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .query({ access_token: config.masterKey })
    .auth('a@a.com', '12345678');

  expect(status).toBe(201);
  expect(typeof body).toBe('object');
  expect(typeof body.token).toBe('string');
  expect(typeof body.user).toBe('object');
  expect(body.user.id).toBe(user.id);
  expect(await verify(body.token)).toBeTruthy();
});

test('POST /auth 400 (master) - invalid email', async () => {
  const { status, body } = await request(app())
    .post('/')
    .query({ access_token: config.masterKey })
    .auth('invalid', '12345678');

  expect(status).toBe(400);
  expect(typeof body).toBe('object');
  expect(body.name).toBe('ValidationError');
  expect(body.errors.email).toBeDefined();
});

test('POST /auth 400 (master) - invalid password', async () => {
  const { status, body } = await request(app())
    .post('/')
    .query({ access_token: config.masterKey })
    .auth('a@a.com', '123');

  expect(status).toBe(400);
  expect(typeof body).toBe('object');
  expect(body.name).toBe('ValidationError');
  expect(body.errors.password).toBeDefined();
  expect(body.errors.password.kind).toBe('minlength');
});

test('POST /auth 401 (master) - user does not exist', async () => {
  const { status } = await request(app())
    .post('/')
    .query({ access_token: config.masterKey })
    .auth('b@b.com', '12345678');

  expect(status).toBe(401);
});

test('POST /auth 401 (master) - wrong password', async () => {
  const { status } = await request(app())
    .post('/')
    .query({ access_token: config.masterKey })
    .auth('a@a.com', '87654321');

  expect(status).toBe(401);
});

test('POST /auth 401 (master) - missing access_token', async () => {
  const { status } = await request(app())
    .post('/')
    .auth('a@a.com', '12345678');

  expect(status).toBe(401);
});

test('POST /auth 401 (master) - missing auth', async () => {
  const { status } = await request(app())
    .post('/')
    .query({ access_token: config.masterKey });

  expect(status).toBe(401);
});

/*
test('POST /auth/facebook 201', async () => {
  stub(facebook, 'getUser', () => Promise.resolve({
    service: 'facebook',
    id: '123',
    name: 'user',
    email: 'b@b.com',
    picture: 'test.jpg'
  }))
  const { status, body } = await request(app())
    .post('/facebook')
    .send({ access_token: '123' })
  expect(status).toBe(201)
  expect(typeof body).toBe('object')
  expect(typeof body.token).toBe('string')
  expect(typeof body.user).toBe('object')
  expect(await verify(body.token)).toBeTruthy()
})

test('POST /auth/facebook 401 - missing token', async () => {
  const { status } = await request(app())
    .post('/facebook')
  expect(status).toBe(401)
})

test('POST /auth/github 201', async () => {
  stub(github, 'getUser', () => Promise.resolve({
    service: 'github',
    id: '123',
    name: 'user',
    email: 'b@b.com',
    picture: 'test.jpg'
  }))
  const { status, body } = await request(app())
    .post('/github')
    .send({ access_token: '123' })
  expect(status).toBe(201)
  expect(typeof body).toBe('object')
  expect(typeof body.token).toBe('string')
  expect(typeof body.user).toBe('object')
  expect(await verify(body.token)).toBeTruthy()
})

test('POST /auth/github 401 - missing token', async () => {
  const { status } = await request(app())
    .post('/github')
  expect(status).toBe(401)
})
*/

test.only('POST /auth/google 201', async () => {
  stub(passport, 'google').callsFake(() => Promise.resolve({
    provider: 'google',
      id: '123',
      name: 'user',
      emails: ['b@b.com'],
      picture: 'test.jpg',
  }));
  const { status, body } = await request(app())
    .post('/google')
    .send({ access_token: '123' });

  expect(status).toBe(201);
  expect(typeof body).toBe('object');
  expect(typeof body.token).toBe('string');
  expect(typeof body.user).toBe('object');
  expect(await verify(body.token)).toBeTruthy();
});

test('POST /auth/google 401 - missing token', async () => {
  const { status } = await request(app())
    .post('/google');

  expect(status).toBe(401);
});
