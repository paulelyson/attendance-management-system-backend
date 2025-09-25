import mongoose, { Schema, Types } from 'mongoose';

type BreakType = 'lunch' | 'bathroom';
type Weekdays = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
const weekdaysEnum = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const validateTime = (time: string) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);

interface ScheduleInterface {
  schedule_day: Weekdays;
  timeIn: string;
  timeOut: string;
  break: BreakInterface[];
}

interface BreakInterface {
  type: BreakType;
  breakIn: string;
  breakOut: string;
}

interface UserAttendaceDetailInterface {
  user: Types.ObjectId;
  schedule: ScheduleInterface[];
}

const BreakSchema = new Schema<BreakInterface>({
  type: { type: String, enum: ['lunch', 'bathroom'] },
  breakIn: { type: String, validate: validateTime },
  breakOut: { type: String, validate: validateTime },
});

const ScheduleSchema = new Schema<ScheduleInterface>({
  schedule_day: { type: String, required: true, enum: weekdaysEnum },
  timeIn: { type: String, validate: validateTime },
  timeOut: { type: String, validate: validateTime },
  break: { type: [BreakSchema] },
});

const UserAttendanceDetailSchema = new Schema<UserAttendaceDetailInterface>({
  user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
  schedule: { type: [ScheduleSchema], required: true },
});

export default mongoose.model('user_attendance_detail', UserAttendanceDetailSchema);
