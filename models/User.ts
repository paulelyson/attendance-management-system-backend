import mongoose, { Schema } from 'mongoose';

interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  dis: boolean;
}

const UserSchema = new Schema<UserInterface>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    dis: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('user', UserSchema);
