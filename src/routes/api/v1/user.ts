import * as express from 'express';
import { Router } from 'express-serve-static-core';
import { isLoggedIn } from './helpers';

const router = express.Router();

router.route('/login')
  .post((req, res, next) => {
    res.status(200).send('OK');
    console.log(req);
  });

router.route('/profile')
  .get(isLoggedIn, (req, res, next) => {
    res.status(200).send('OK');
  })
  .post(isLoggedIn, (req, res, next) => {
    res.status(200).send('OK');
  });

router.route('/logout')
  .post((req, res, next) => {
    res.status(200).send('OK');
    console.log(req);
  });


export default router;
