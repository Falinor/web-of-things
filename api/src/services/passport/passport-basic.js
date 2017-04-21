import _ from 'lodash';
import passport from 'passport';
import { BasicStrategy } from 'passport-http';

import User from '../../api/user/model';

passport.use('password', new BasicStrategy((email, password, done) => {
  // Build an User
  const user = new User({ email, password });

  // Validate the input format
  user.validate((err) => {
    if (err) {
      // Remove unsafe properties like password and so on...
      err.errors = _.mapValues(err.errors, (field) => {
        return _.pick(field, ['message', 'name', 'kind']);
      });
      done(err);
    }
  });

  // Find the given user by email
  User.findOne({ email }).then((user) => {
    if (!user) {
      done(true);
      return null;
    }
    // Check whether passwords match
    return user.authenticate(password, user.password).then((user) => {
      done(null, user);
      return null;
    }).catch(done);
  });
}));

/**
 * Authenticate using Basic strategy i.e. email and password.
 * @return {function(*, *, *)}
 */
export const password = () => (req, res, next) =>
  passport.authenticate('password', { session: false }, (err, user, info) => {
    if (err && err.errors) {
      return res.status(400).json(err);
    } else if (err || !user) {
      return res.status(401).end();
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return res.status(401).end();
      next();
    });
  })(req, res, next);
