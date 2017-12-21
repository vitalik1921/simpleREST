import * as express from 'express';
import { Router } from 'express-serve-static-core';

import Article from '../../../models/Article';
import { isLoggedIn } from './helpers';

const router = express.Router();

router.get('/', (req, res) => {
  const page = parseInt(req.query.page, 10);
  const limit = parseInt(req.query.limit, 10);
  const query = req.query.userId === 'null' ? {} : { userId: req.query.userId };
  if (page < 1) { res.status(404).send(); }
  Article.find(query).skip((page - 1) * limit).limit(limit)
    .then((results) => {
      return results.length ? res.status(200).json(results) : res.status(404).send();
    })
    .catch((err) => {
      return res.status(403);
    });
});

export default router;
