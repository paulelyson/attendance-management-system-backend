import mongoose, { Schema } from 'mongoose';

interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
}

const UserSchema = new Schema<UserInterface>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
});

export default mongoose.model('user', UserSchema)