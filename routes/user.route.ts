import { Router, Request, Response } from 'express';
import User from './../models/User';

const router = Router();

router.get('/', async (req: Request, res: Response) =>
  Promise.resolve()
    .then(async () => {
      let users = await User.find({}).lean()
      res.json({ data: users, message: 'Success getting users', success: true });
    })
    .catch((err: Error) => {
      res.json({ data: null, message: err.message, success: true });
    })
);

router.post('/', async (req: Request, res: Response) =>
  Promise.resolve()
    .then(async () => {
      let payload = req.body;
      return await User.create(payload);
    })
    .then((resp) => {
      res.json({ data: resp, message: 'Success creating user', success: true });
    })
    .catch((err: Error) => {
      res.json({ data: null, message: err.message, success: true });
    })
);

export default router;
