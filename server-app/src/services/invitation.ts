import * as EmailValidator from 'email-validator';
import Invitation from '../models/invitation';
import User from '../models/user';
import GroupService from './group';
import UserService, { DEFAULT_USER_PROJECTION } from './user';

type InviteParams = {
  senderId: string;
  recipientQuery: string;
  groupId: string;
};

const InvitationService = {
  async getUserInvitations(userId: string) {
    const invitatations = await Invitation.find({ recipientId: userId });
    invitatations;

    if (invitatations.length === 0) {
      return [];
    }
    const senderIds = invitatations.map((inv) => inv.get('senderId'));

    const senders = await User.find(
      {
        _id: {
          $in: senderIds,
        },
      },
      DEFAULT_USER_PROJECTION
    );

    const senderMap = new Map(
      senders.map((sender) => [sender._id!.toString(), sender])
    );

    return invitatations.map(({ _id, senderId, invitedGroup }) => {
      const sender = senderMap.get(senderId.toString());

      return {
        _id,
        sender,
        invitedGroup,
      };
    });
  },
  async makeAnInivte({ senderId, recipientQuery, groupId }: InviteParams) {
    const isEmail = EmailValidator.validate(recipientQuery);

    const sender = await UserService.findById(senderId);
    const recipient = isEmail
      ? await UserService.findByEmail(recipientQuery)
      : await UserService.findByUsername(recipientQuery);
    const groupToInvite = await GroupService.findById(groupId);

    const invitation = await Invitation.create({
      senderId: sender._id,
      recipientId: recipient._id,
      invitedGroup: {
        id: groupToInvite._id,
        name: groupToInvite.name,
      },
    });

    return invitation;
  },
};

export default InvitationService;
