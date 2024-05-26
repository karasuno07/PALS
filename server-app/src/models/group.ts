import { HttpClientError } from '@/errors';
import { body, param } from 'express-validator';
import { Schema, model } from 'mongoose';

const groupSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: {
    type: String,
    required: true,
  },
  members: [
    {
      memberId: { type: Schema.Types.ObjectId, ref: 'User' },
      memberBalance: Number,
    },
  ],
  expenses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Expense',
    },
  ],
  balance: [
    {
      from: { type: Schema.Types.ObjectId, ref: 'Member' },
      to: { type: Schema.Types.ObjectId, ref: 'Member' },
      balance: Number,
    },
  ],
});

const Group = model('Group', groupSchema);

export const GroupValidator = {
  create: [
    body('name', 'Group name already in use').custom(async (name) => {
      const existingGroup = await Group.findOne({ name });
      if (existingGroup) {
        throw new HttpClientError('Group name already in use');
      }
    }),
    body('name', 'Group name is required').notEmpty(),
    body(
      'name',
      'Group name must be between 3 and 15 characters long'
    ).isLength({
      min: 3,
      max: 15,
    }),
    body('description', 'Group description is required').notEmpty(),
  ],
  findById: [
    param('groupId', 'Group Id is required for searching by Id').notEmpty(),
  ],
  delete: [param('groupId', 'Group Id is required for deletion').notEmpty()],
};

export default Group;
