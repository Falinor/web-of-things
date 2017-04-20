import _ from 'lodash';

export const validationError = () => (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  // Remove useless fields
  if (err && err.name === 'ValidationError' && err.errors) {
    err.errors = _.mapValues(err.errors, (val) => {
      return _.pick(val, ['message', 'name', 'kind']);
    });
    // Send response
    res.status(400).json(err);
  }
};
