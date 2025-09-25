import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) =>
  Promise.resolve()
    .then(() => {
      res.json({ data: null, message: 'success get', success: true });
    })
    .catch((err: Error) => {
      res.json({ data: null, message: err.message, success: true });
    })
);


router.post('/', async (req: Request, res: Response) =>
  Promise.resolve()
    .then(() => {
      res.json({ data: null, message: 'success get', success: true });
    })
    .catch((err: Error) => {
      res.json({ data: null, message: err.message, success: true });
    })
);

export default router;
