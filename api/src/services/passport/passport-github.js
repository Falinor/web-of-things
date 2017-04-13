import passport from 'passport';
import * as githubService from '../github/index';

passport.use('github', new BearerStrategy((token, done) => {
  githubService.getUser(token).then((user) => {
    return User.createFromService(user);
  }).then((user) => {
    done(null, user);
    return null;
  }).catch(done);
}));

/**
 * Authenticate using Github
 */
export const github = () =>
  passport.authenticate('github', { session: false });


