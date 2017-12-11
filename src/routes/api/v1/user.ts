import * as express from 'express';
import * as passport from 'passport';
import { Router } from 'express-serve-static-core';
import { isLoggedIn } from './helpers';

const router = express.Router();

router.route('/login')
  .post((req, res, next) => {
    passport.authenticate('local',
      function (err1, user, info) {
        return err1
          ? next(err1)
          : user
            ? req.logIn(user, function (err2) {
              return err2
                ? next(err2)
                : res.status(200).send('LoggedIn');
            })
            : res.status(403).send('Error');
      }
    )(req, res, next);
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
    req.logout();
    res.status(200).send('OK');
  });


export default router;
