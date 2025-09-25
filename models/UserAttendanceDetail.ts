import mongoose, { Schema, SchemaOptions, Types } from 'mongoose';

type BreakType = 'lunch_break' | 'bathroom_break';
type Weekdays = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
const weekdaysEnum = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const validateTime = (time: string) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
const options = { timestamps: true };

interface ScheduleInterface {
  scheduleDay: Weekdays;
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
  dis: boolean;
}

const BreakSchema = new Schema<BreakInterface>({
  type: { type: String, enum: ['lunch_break', 'bathroom_break'] },
  breakIn: { type: String, validate: validateTime },
  breakOut: { type: String, validate: validateTime },
});

const ScheduleSchema = new Schema<ScheduleInterface>({
  scheduleDay: { type: String, required: true, enum: weekdaysEnum },
  timeIn: { type: String, required: true, validate: validateTime },
  timeOut: { type: String, required: true, validate: validateTime },
  break: { type: [BreakSchema], default: [] },
});

const UserAttendanceDetailSchema = new Schema<UserAttendaceDetailInterface>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    schedule: { type: [ScheduleSchema], required: true },
    dis: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('user_attendance_detail', UserAttendanceDetailSchema);
