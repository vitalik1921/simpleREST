import * as express from 'express';
import { Router } from 'express-serve-static-core';

const router: Router = express.Router();

router.use('/api/v1/', require('./api/v1/'));

export { router };
