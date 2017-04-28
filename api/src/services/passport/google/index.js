import passport from 'passport';

import User from '../../../api/user/model';
import config from '../../../config';

import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';

passport.use('google', new GoogleStrategy({
  clientID: config.providers.google.clientId,
  clientSecret: config.providers.google.clientSecret,
  callbackURL: `${config.ip}:${config.port}/auth/google/callback`,
}, (accessToken, refreshToken, profile, done) => {
  User.createFromService(profile)
    .then((user) => {
      done(null, user);
      return null;
    })
    .catch(done);
}));

/**
 * Authenticate using Google
 */
export const google = (withScopes = false) => {
  console.log('google called');
  const opts = { session: false };
  if (withScopes) {
    opts.scope = ['openid profile email'];
  }
  return passport.authenticate('google', opts);
};
