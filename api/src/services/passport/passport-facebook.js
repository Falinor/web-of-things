import passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';

import * as facebookService from '../facebook';
import User from '../../api/user/model';

/**
 * Declare Facebook strategy
 */
passport.use('facebook', new BearerStrategy((token, done) => {
  facebookService.getUser(token).then((user) => {
    return User.createFromService(user);
  }).then((user) => {
    done(null, user);
    return null;
  }).catch(done);
}));

/**
 * Authenticate using Facebook
 */
export const facebook = () =>
  passport.authenticate('facebook', { session: false });
