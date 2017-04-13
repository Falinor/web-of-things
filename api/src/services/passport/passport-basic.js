// TODO(imports)
import { Schema } from 'mongoose';
import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import User, { schema } from '../../api/user/model';

passport.use('password', new BasicStrategy((email, password, done) => {
  // Build an User
  const userSchema = new Schema({
    email: schema.tree.email,
    password: schema.tree.password,
  });

  // Validate the input format
  /*
  userSchema.validate({ email, password }, (err) => {
    if (err) done(err);
  });
  */

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
    if (err && err.param) {
      return res.status(400).json(err);
    } else if (err || !user) {
      return res.status(401).end();
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return res.status(401).end();
      next();
    });
  })(req, res, next);
