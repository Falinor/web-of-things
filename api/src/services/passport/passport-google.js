import passport from 'passport';
import * as googleService from '../google';

passport.use('google', new BearerStrategy((token, done) => {
  googleService.getUser(token).then((user) => {
    return User.createFromService(user)
  }).then((user) => {
    done(null, user)
    return null
  }).catch(done)
}));

/**
 * Authenticate using Google
 */
export const google = () =>
  passport.authenticate('google', { session: false });
