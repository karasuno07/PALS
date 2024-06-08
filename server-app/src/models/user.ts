import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  emailVerified: {
    type: Date,
  },
  image: {
    type: String,
  },
  groups: [
    {
      id: { type: Schema.Types.ObjectId, ref: 'Group' },
      name: String,
    },
  ],
});


const User = model('User', userSchema);

export type UserAuth = {
  username: string;
  password: string;
};

export type UserRequest = {
  username: string;
  password: string;
  name: string;
  email?: string;
  image?: string;
};

export default User;
