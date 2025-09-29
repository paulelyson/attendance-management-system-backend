import mongoose, { Schema, Types } from 'mongoose';

export type AttendanceStatus = 'late' | 'undertime' | 'in_ontime' | 'out_ontime' | 'onbreak';
export const getCurrentTime = () => {
  const timestamp = Date.now(); // number
  const date = new Date(timestamp); // convert to Date object
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export interface DailyAttendanceInterface {
  date: Date;
  user: Types.ObjectId;
  timeIn: string;
  timeOut: string;
  status: AttendanceStatus[];
}

const DailyAttendanceSchema = new Schema<DailyAttendanceInterface>(
  {
    date: { type: Date, required: true, default: Date.now },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    timeIn: { type: String, required: true, default: getCurrentTime, validate: (v: string) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(v) },
    timeOut: { type: String, validate: (v: string) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(v) },
    status: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model('daily_attendance', DailyAttendanceSchema);
