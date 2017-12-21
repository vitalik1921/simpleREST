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
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      if (password !== user.password) {
        return done(null, false, { message: 'Incorrect password' });
      }
      const expiredDate = new Date(Date.now() + 86400000);
      AccessToken.findOne({ userId: user._id })
        .then((accessToken: IAccessToken) => {
          if (accessToken) {
            if ((new Date()) > accessToken.expired) {
              accessToken.remove().then(() => {
                AccessToken.create({ userId: user._id, expired: expiredDate })
                  .then((newToken: IAccessToken) => {
                    return done(null, newToken);
                  });
              });
            }
            accessToken.expired = expiredDate;
            accessToken.save().then((savedToken) => {
              return done(null, savedToken);
            });
          } else {
            AccessToken.create({ userId: user._id, expired: expiredDate })
              .then((newToken: IAccessToken) => {
                return done(null, newToken);
              });
          }
        });
    });
  }
);

export { localStrategy };

