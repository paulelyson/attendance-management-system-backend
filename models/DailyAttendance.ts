import mongoose, { Schema, Types } from 'mongoose';

interface DailyAttendanceInterface {
  date: Date;
  user: Types.ObjectId;
  timeIn: string;
  timeOut: string;
}

const DailyAttendanceSchema = new Schema<DailyAttendanceInterface>(
  {
    date: { type: Date, required: true, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    timeIn: { type: String, required: true, validate: (v: string) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(v) },
    timeOut: { type: String, required: true, validate: (v: string) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(v) },
  },
  { timestamps: true }
);

export default mongoose.model('daily_attendance', DailyAttendanceSchema);
