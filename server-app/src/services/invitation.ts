import * as EmailValidator from 'email-validator';
import { HttpClientError } from '../errors';
import Invitation from '../models/invitation';
import User from '../models/user';
import GroupService from './group';
import UserService, { DEFAULT_USER_PROJECTION } from './user';

type InviteParams = {
  senderId: string;
  recipientQuery: string;
  groupId: string;
};

type ReplyParams = {
  invitationId: string;
  accepterId: string;
};

const InvitationService = {
  async findById(id: string) {
    const invitation = await Invitation.findById(id);
    if (!invitation) {
      throw new HttpClientError({
        status: 404,
        name: 'Resource Not Found',
        message: `Not found any invitation with id ${id}`,
      });
    }
    return invitation;
  },
  async getUserInvitations(userId: string) {
    const invitatations = await Invitation.find({
      recipientId: userId,
      status: 'pending',
    });
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

    const existingInvitation = await Invitation.find({
      senderId,
      recipientId: recipient._id,
      status: 'pending',
    });
    if (existingInvitation) {
      throw new HttpClientError({
        status: 400,
        name: 'Unique Resource Validation',
        message: `There's already a pending invitation to user ${recipientQuery}`,
      });
    }

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
  async accept({ invitationId, accepterId }: ReplyParams) {
    const inivitation = await InvitationService.findById(invitationId);

    await GroupService.addMember(
      inivitation.invitedGroup!.id.toString(),
      accepterId
    );

    inivitation.status = 'accepted';

    await inivitation.save();

    return inivitation;
  },
  async decline({ invitationId }: Omit<ReplyParams, 'accepterId'>) {
    const inivitation = await InvitationService.findById(invitationId);

    inivitation.status = 'declined';

    await inivitation.save();

    return inivitation;
  },
};

export default InvitationService;
