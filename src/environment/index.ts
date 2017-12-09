import { Environment } from './interfaces';

const environmentName = process.env.NODE_ENV || 'development';
const environment: Environment = require(`./${environmentName}`).default;

export { environment };
