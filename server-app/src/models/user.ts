import { body, param } from 'express-validator';
import { Schema, model } from 'mongoose';
import { HttpClientError } from '../errors';

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
  },
  emailVerified: {
    type: Date,
  },
  image: {
    type: String,
  },
});

const User = model('User', userSchema);

export const UserValidator = {
  findByUsername: [
    param('username', 'Username is required for searching').notEmpty(),
  ],
  authenticate: [
    body('username', 'Username is required').notEmpty(),
    body(
      'username',
      'Username must be betweem 6 and 20 characters length'
    ).isLength({ min: 6, max: 20 }),
    body('password', 'Password is required').notEmpty(),
    body(
      'password',
      'Password must be between 6 and 50 characters length'
    ).isLength({ min: 6, max: 20 }),
  ],
  create: [
    body('username', 'Username already in use').custom(async (username) => {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new HttpClientError({
          name: 'Validation Error',
          message: 'Group name already in use',
        });
      }
    }),
    body('username', 'Username is required').notEmpty(),
    body(
      'username',
      'Username must be betweem 6 and 20 characters length'
    ).isLength({ min: 6, max: 20 }),
    body('password', 'Password is required').notEmpty(),
    body(
      'password',
      'Password must be between 6 and 50 characters length'
    ).isLength({ min: 6, max: 20 }),
    body('name', 'Name is required').notEmpty(),
  ],
};

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
