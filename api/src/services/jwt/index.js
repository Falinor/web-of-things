import jwt from 'jsonwebtoken';
import Promise from 'bluebird';

import config from '../../config';

const jwtSign = Promise.promisify(jwt.sign);
const jwtVerify = Promise.promisify(jwt.verify);
const opts = {
  expiresIn: config.tokenExpiration,
};

export const sign = (id, options = opts, method = jwtSign) =>
  method({ id }, config.jwtSecret, options);

export const signSync = (id, options = opts) => sign(id, options, jwt.sign);

export const verify = (token) => jwtVerify(token, config.jwtSecret);
