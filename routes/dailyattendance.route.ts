import { Router, Request, Response } from 'express';
import DailyAttendance, { AttendanceStatus, DailyAttendanceInterface, getCurrentTime } from '../models/DailyAttendance';
import DailyAttendanceRepository from '../repositories/dailyAttendanceRepository';
import { UserAttendaceDetailInterface, Weekdays } from '../models/UserAttendanceDetail';
import UserAttendanceDetailRepository from '../repositories/userAttendanceDetailRepository';

const dailyAttendanceRepository = new DailyAttendanceRepository();
const userAttendanceDetailRepository = new UserAttendanceDetailRepository();
const router = Router();

interface AggregateResult extends DailyAttendanceInterface {
  user_schedule: UserAttendaceDetailInterface;
}

router.get('/', async (req: Request, res: Response) =>
  Promise.resolve()
    .then(async () => {
      let aggregateQuery = [
        {
          $lookup: {
            from: 'user_attendance_details',
            localField: 'user',
            foreignField: 'user',
            as: 'user_schedule',
          },
        },
        {
          $unwind: {
            path: '$user_schedule',
          },
        },
      ];
      return await DailyAttendance.aggregate(aggregateQuery);
    })
    .then((attendances: AggregateResult[]) => {
      let dayName = dailyAttendanceRepository.getCurrentDayName() as Weekdays;
      attendances = attendances.map((attndnce) => {
        let schedule = userAttendanceDetailRepository.getScheduleByDay(dayName, attndnce.user_schedule);
        let status: AttendanceStatus[] = [];
        let timeIn = attndnce.timeIn;
        let userTimeIn = schedule?.timeIn;
        if (userTimeIn) {
          status.push(dailyAttendanceRepository.getTimeInStatus(userTimeIn, timeIn));
        }
        return { ...attndnce, status };
      });

      return attendances;
    })
    .then((attendances) => {
      let dayName = dailyAttendanceRepository.getCurrentDayName() as Weekdays;
      let attenances_mapped: DailyAttendanceInterface[] = attendances
        .map((attndnce) => {
          let schedule = userAttendanceDetailRepository.getScheduleByDay(dayName, attndnce.user_schedule);
          let status: AttendanceStatus[] = attndnce.status;
          let userTimeOut = schedule?.timeOut;
          let timeOut = attndnce.timeOut;
          if (timeOut && userTimeOut) {
            status.push(dailyAttendanceRepository.getTimeOutStatus(userTimeOut, timeOut));
          }
          return { ...attndnce, status };
        })
        .map(({ user_schedule, ...attndnce }) => attndnce);
      res.json({ data: attenances_mapped, message: 'Success getting daily attendance', success: true });
    })

    .catch((err) => {
      console.log(err);
      res.json({ data: null, message: err.message, success: false });
    })
);

router.post('/', async (req: Request, res: Response) =>
  Promise.resolve()
    .then(async () => {
      await DailyAttendance.create(req.body);
      res.json({ data: null, message: 'Success time in', success: true });
    })
    .catch((err) => {
      res.json({ data: null, message: err.message, success: false });
    })
);

router.patch('/timeout/:id', async (req: Request, res: Response) =>
  Promise.resolve()
    .then(async () => {
      const id = req.params.id;
      const update = { timeOut: getCurrentTime() };
      const options = { new: true, runValidators: true };
      await DailyAttendance.findByIdAndUpdate(id, update, options);
      res.json({ data: null, message: 'Success time out', success: true });
    })
    .catch((err) => {
      res.json({ data: null, message: err.message, success: false });
    })
);

export default router;
