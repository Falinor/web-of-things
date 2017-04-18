// TODO(imports)
import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import User, { schema } from '../../api/user/model';

passport.use('password', new BasicStrategy((email, password, done) => {
  // Build an User
  const user = new User({ email, password });

  // Validate the input format
  user.validate((err) => {
    if (err) {
      // Iterate through err.errors object to retain only safe properties
      // e.g. not password and so on...
      Object.keys(err.errors).forEach((key) => {
        err.errors[key] = {
          message: err.errors[key].message,
          name: err.errors[key].name,
          kind: err.errors[key].kind,
        };
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
