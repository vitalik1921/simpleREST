import { Application } from 'express';
import * as passport from 'passport';
import * as passportLocal from 'passport-local';

import { localStrategy } from '../config/localStrategy';
import { tokenStrategy } from '../config/tokenStrategy';
import User, { IUser } from '../models/User';
import { IAccessToken } from '../models/AccessToken';

export default function register(app: Application) {
  console.log('Passport module started');
  passport.use(localStrategy);
  passport.use(tokenStrategy);
  passport.serializeUser(function (token: IAccessToken, done) {
    done(null, token._id);
  });
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, u: IUser) {
      err
        ? done(err)
        : done(null, u);
    });
  });
  app.use(passport.initialize());
  app.use(passport.session());
}
