import { Document, Schema, model } from 'mongoose';
import User from './user';

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

groupSchema.post('findOneAndDelete', async function (doc: Document | null) {
  if (doc) {
    await User.deleteMany({ groups_id: doc.id });
  }
});
groupSchema.post('deleteOne', async function (doc: Document | null) {
  if (doc) {
    await User.deleteMany({ groups_id: doc.id });
  }
});

const Group = model('Group', groupSchema);

export default Group;
