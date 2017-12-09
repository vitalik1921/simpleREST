import { Environment } from './interfaces';

const environment: Environment = {
    name: 'development',
    serverUrl: 'http://localhost:3000',
    mongoUrl: 'mongodb://localhost:27017/simpleBlog',
    sessionSecret: '3A52E7E467CE36DD1B3F23C9C8B6A'
};

export default environment;

