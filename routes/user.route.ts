import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  res.json({ data: null, message: 'success get', success: true });
});


export default router;