// TODO(imports)
import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

import User from '../../api/user/model';
import config from '../../config';

/**
 * Define JWT strategy
 */
passport.use('token', new JwtStrategy({
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromUrlQueryParameter('access_token'),
    ExtractJwt.fromBodyField('access_token'),
    ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  ]),
}, ({ id }, done) => {
  User.findById(id).then((user) => {
    done(null, user);
    return null;
  }).catch(done);
}));

/**
 *
 * @param required
 * @param roles
 * @returns {function(*=, *=, *=)}
 */
export const token = ({ required, roles = User.roles } = {}) =>
  (req, res, next) =>
    passport.authenticate('token', {session: false}, (err, user, info) => {
      if (err
        || (required && !user)
        || (required && !~roles.indexOf(user.role))) {
        return res.status(401).end();
      }
      req.logIn(user, {session: false}, (err) => {
        if (err) return res.status(401).end();
        next();
      });
    })(req, res, next);
