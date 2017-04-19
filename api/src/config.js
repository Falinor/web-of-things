/* eslint-disable no-unused-vars */
import path from 'path';
import _ from 'lodash';

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
};

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    mongo: {
      options: {
        db: {
          safe: true,
        },
      },
    },
  },
  test: {
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost/wot-authorization-server-api-test',
      options: {
        debug: false,
      },
    },
  },
  development: {
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost/wot-authorization-server-api-dev',
      options: {
        debug: true,
      },
    },
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost/wot-authorization-server-api',
    },
  },
};

const fullConf = _.merge(config.all, config[config.all.env]);
export default fullConf;
