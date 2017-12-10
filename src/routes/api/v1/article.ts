import * as express from 'express';
import { Router } from 'express-serve-static-core';
import { isLoggedIn } from './helpers';

const router = express.Router();

router.get('/', isLoggedIn, (req, res) => {
  res.status(200).send('article');
});

export default router;
