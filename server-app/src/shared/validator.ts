import { body, param } from 'express-validator';
import { HttpClientError } from '../errors';
import Group from '../models/group';
import User from '../models/user';

export const GroupValidator = {
  create: [
    body('name', 'Group name already in use').custom(async (name) => {
      const existingGroup = await Group.findOne({ name });
      if (existingGroup) {
        throw new HttpClientError({
          status: 400,
          name: 'Validation Error',
          message: 'Group name already in use',
        });
      }
    }),
    body('name', 'Group name is required').notEmpty(),
    body(
      'name',
      'Group name must be between 3 and 20 characters long'
    ).isLength({
      min: 3,
      max: 20,
    }),
    body('description', 'Group description is required').notEmpty(),
  ],
  findById: [
    param('groupId', 'Group Id is required for searching by Id').notEmpty(),
  ],
  addUser: [
    param('groupId', 'Group Id is required for adding user').notEmpty(),
    body('email', 'User email address is required'),
  ],
  delete: [param('groupId', 'Group Id is required for deletion').notEmpty()],
};

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
          message: 'Username already in use',
        });
      }
    }),
    body('email', 'Email address already in use').custom(async (email) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new HttpClientError({
          name: 'Validation Error',
          message: 'Email address already in use',
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
