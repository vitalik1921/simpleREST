import * as express from 'express';
import { Router } from 'express-serve-static-core';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('comment');
  });

export default router;
