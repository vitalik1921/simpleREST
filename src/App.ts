import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as methodOverride from 'method-override';
import * as mongoose from 'mongoose';
import * as path from 'path';

import { environment } from './environment';
import modules from './modules';
import { router } from './routes';

class App {
  public express: any;
  public db: mongoose.Connection;

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

    // Use modules
    modules(this.express);

    // Configure router
    this.express.use('/', router);
  }
}

export default new App().express;
