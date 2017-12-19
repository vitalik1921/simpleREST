import * as passportLocal from 'passport-local';
import User, { IUser } from '../models/User';
import AccessToken, { IAccessToken } from '../models/AccessToken';

const localStrategy = new passportLocal.Strategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  (username, password, done) => {
    User.findOne({ email: username }, function (err, user: IUser) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      if (password !== user.password) {
        return done(null, false, { message: 'Incorrect password' });
      }
      AccessToken.create({ userId: user._id }).then((accessToken) => {
        return done(null, accessToken);
      });
    });
  }
);

export { localStrategy };

