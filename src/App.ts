import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import * as passport from 'passport';
import * as passportLocal from 'passport-local';

import User, { IUser } from './models/User';

import { environment } from './environment';
import { router } from './routes';
import { localStrategy } from './config/localStrategy';

class App {
  public express: any;
  public db: Connection;

  constructor() {
    this.express = express();
    if (environment.name === 'development') {
      this.express.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
      });
    }
    this.express.use(bodyParser.json());
    this.express.use(methodOverride('X-HTTP-Method-Override'));
    this.express.use(express.static(path.join(__dirname, '..', 'dist')));

    // Configure passport middleware
    passport.use(localStrategy);
    passport.serializeUser(function (user: IUser, done) {
      done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
      User.findById(id, function (err, user: IUser) {
        err
          ? done(err)
          : done(null, user);
      });
    });
    this.express.use(passport.initialize());
    this.express.use(passport.session());

    // Configure router
    this.express.use('/', router);
    this.db = mongoose.createConnection(environment.mongoUrl,
      {
        user: environment.mongoUser,
        pass: environment.mongoPassword
      }
    );

    // Configure mongodb
    this.db.on('open', this.open);
    this.db.on('error', this.error);
  }

  open() {
    console.log('Connected to DB!');
  }

  error(err) {
    console.log('DB Connection error:', err.message);
  }
}

export default new App().express;
