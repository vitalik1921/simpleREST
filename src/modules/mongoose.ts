import * as Promise from 'bluebird';
import { Application } from 'express';
import * as mongoose from 'mongoose';

import { environment } from '../environment';
import User, { IUser } from '../models/User';

function gracefulExit(mongo: mongoose.Mongoose) {
  return () => mongo.connection.close(() => {
    console.log(`Mongoose connection ` +
      `has disconnected through app termination`);
    process.exit(0);
  });
}

export default function register(app: Application) {
  console.log('Mongoose module started');
  (<any>mongoose).Promise = Promise;

  mongoose.connection.on('connected', () => {
    console.log(`Successfully connected to ${environment.name}` +
      ` database on startup `);
  });

  mongoose.connection.on('error', (err: any) => {
    console.error(`Failed to connect to ${environment.name} ` +
      ` database on startup `, err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log(`Mongoose default connection to ${environment.name}` +
      ` database disconnected`);
  });

  process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

  // Connect to our MongoDB database using the MongoDB
  // connection URI from our predefined environment variable
  mongoose.connect(environment.mongoUrl, { useMongoClient: true }, (error: any) => {
    if (error) {
      throw error;
    }
  });

  process.on('SIGINT', gracefulExit(mongoose)).on('SIGTERM', gracefulExit(mongoose));
}
