import Promise from 'bluebird';
import mongoose from 'mongoose';

import { User } from '../../api/user';
import config from '../../config';

Object.keys(config.mongo.options).forEach((key) => {
  mongoose.set(key, config.mongo.options[key]);
});

mongoose.Promise = Promise;
/* istanbul ignore next */
mongoose.Types.ObjectId.prototype.view = function() {
  return { id: this.toString() };
};

/* istanbul ignore next */
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

/**
 * Initializes the master account using given environment variables.
 * @return {Promise}
 */
export const initMasterAccount = () => {
  return new User({
    email: config.masterAccount,
    password: config.masterPassword,
    role: 'admin',
  }).save()
    .catch(() => {
      console.log('Master account already exists. Skipping...');
    });
};

// Mongoose error handlers
export { validationError } from './errors';
export default mongoose;
