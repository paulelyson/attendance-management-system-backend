import mongoose, { Schema, Types } from 'mongoose';

type BreakType = 'lunch' | 'bathroom';

interface BreakInterface {
  type: BreakType;
  breakIn: string;
  breakOut: string;
}

interface UserAttendaceDetailInterface {
  user: Types.ObjectId;
  timeIn: String;
  timeOut: String;
  break: BreakInterface[];
}

const BreakSchema = new Schema<BreakInterface>({
  type: { type: String, enum: ['lunch', 'bathroom'] },
  breakIn: { type: String },
  breakOut: { type: String },
});

const UserAttendanceDetailSchema = new Schema<UserAttendaceDetailInterface>({
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  timeIn: { type: String, required: true, validate: (v: string) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(v) },
  timeOut: { type: String, required: true, validate: (v: string) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(v) },
  break: { type: [BreakSchema] },
});


export default mongoose.model('user_attendace_detail', UserAttendanceDetailSchema);
