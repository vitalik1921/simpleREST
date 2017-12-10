import * as express from 'express';
import { Router } from 'express-serve-static-core';
import Article from './article';
import Comment from './comment';
import User from './user';

const router: Router = express.Router();

router.use('/article', require('./article').default);
router.use('/comment', Comment);
router.use('/user', User);

router.use(function (err, req, res, next) {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function (errors, key) {
        errors[key] = err.errors[key].message;
        return errors;
      }, {})
    });
  }
  return next(err);
});

export default router;
