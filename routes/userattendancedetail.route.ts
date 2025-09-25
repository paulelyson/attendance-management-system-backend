import { Router, Request, Response } from 'express';
import UserAttendanceDetail from '../models/UserAttendanceDetail';

const router = Router();

router.get('/', async (req: Request, res: Response) =>
  Promise.resolve()
    .then(async () => {
      let populateQuery = [{ path: 'user', select: 'firstName lastName' }];
      let results = await UserAttendanceDetail.find({}).populate(populateQuery).lean();
      res.json({ data: results, message: 'Success getting users attendance detail', success: true });
    })
    .catch((err: Error) => {
      res.json({ data: null, message: err.message, success: true });
    })
);

router.post('/', async (req: Request, res: Response) =>
  Promise.resolve()
    .then(async () => {
      await UserAttendanceDetail.create(req.body);
      res.json({ data: null, message: 'Success creating user attendance detail', success: true });
    })
    .catch((err: Error) => {
      res.status(400).json({ data: null, message: err.message, success: false });
    })
);

export default router;
