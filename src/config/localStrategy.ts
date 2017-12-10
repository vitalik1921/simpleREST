import * as passportLocal from 'passport-local';
import User, { IUser } from '../models/User';

const localStrategy = new passportLocal.Strategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  (username, password, done) => {
    User.findOne({ username: username }, function (err, user: IUser) {
      return err
        ? done(err)
        : user
          ? password === user.password
            ? done(null, user)
            : done(null, false, { message: 'Incorrect password.' })
          : done(null, false, { message: 'Incorrect username.' });
    });
  }
);

export { localStrategy };

