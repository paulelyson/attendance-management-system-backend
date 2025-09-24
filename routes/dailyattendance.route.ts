import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) =>
  Promise.resolve()
    .then(() => {
      res.json({ data: null, message: 'success get', success: true });
    })
    .catch((err) => {
      console.log(err)
      res.json({ data: null, message: err.message, success: false });
    })
);

router.get('/', async (req: Request, res: Response) =>
  Promise.resolve()
    .then(() => {
      res.json({ data: null, message: 'success get', success: true });
    })
    .catch((err) => {
      console.log(err)
      res.json({ data: null, message: err.message, success: false });
    })
);

export default router;
