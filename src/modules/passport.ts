import { Application } from 'express';
import * as passport from 'passport';
import * as passportLocal from 'passport-local';

import { localStrategy } from '../config/localStrategy';
import User, { IUser } from '../models/User';

export default function register(app: Application) {
  passport.use(localStrategy);
  passport.serializeUser(function (u: IUser, done) {
    done(null, u.id);
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
