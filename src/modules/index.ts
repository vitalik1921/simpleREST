import { Application } from 'express';
import * as fs from 'fs';

const modules: Array<(app: Application) => void> =
  fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('index') < 0 && file.indexOf('map') < 0)
  .map((file) => require(`${__dirname}/${file}`).default);

export default function register(app: Application) {
  modules.forEach((module) => module(app));
}
