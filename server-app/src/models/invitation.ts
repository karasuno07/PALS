import { Schema, model } from 'mongoose';

const invitationSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipientId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    invitedGroup: {
      id: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
      name: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

invitationSchema.index({ senderId: 1, recipientId: 1 }, { unique: true });

const Invitation = model('Invitation', invitationSchema);

export type InvitationRequest = {
  senderId: string;
  recipientQuery: string;
};

export default Invitation;
