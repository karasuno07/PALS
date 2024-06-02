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
      isAdmin: {
        type: Schema.Types.Boolean,
      },
    },
  ],
  expenses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Expense',
    },
  ],
  balances: [
    {
      from: { type: Schema.Types.ObjectId, ref: 'Member' },
      to: { type: Schema.Types.ObjectId, ref: 'Member' },
      balance: Number,
    },
  ],
});

const Group = model('Group', groupSchema);

export default Group;
