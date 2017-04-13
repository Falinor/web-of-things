import passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import config from '../../config';

passport.use('master', new BearerStrategy((token, done) => {
  if (token === config.masterKey) {
    done(null, {});
  } else {
    done(null, false);
  }
}));

/**
 * Authenticate master token.
 * Used by superadmin to operate anything on the server.
 */
export const master = () =>
  passport.authenticate('master', { session: false });
