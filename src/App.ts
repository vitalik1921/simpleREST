import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as passportLocal from 'passport-local';

import User from './models/User';

import { environment } from './environment';
import { router } from './routes';
import { Connection } from 'mongoose';

const LocalStrategy = passportLocal.Strategy;

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
    this.express.use(passport.initialize());
    this.express.use(passport.session());

    // Configure router
    // this.express.use('/', router);
    this.db = mongoose.createConnection(environment.mongoUrl);

    // Configure mongodb
    this.db.on('openUri', this.open);
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
