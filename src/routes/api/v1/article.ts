import * as express from 'express';
import { Router } from 'express-serve-static-core';

const router = express.Router();

router.get('/article', (req, res) => {
  res.status(200).send('article');
});

export default router;
