import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as mongoose from 'mongoose';

import environment from './environment';
import router from './routes';
import { Connection } from 'mongoose';


class App {
  public express: any;
  public db: Connection;

  constructor () {
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
    this.express.use('/', router);

    mongoose.connect(environment.mongoUrl);
    this.db = mongoose.connection;
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
