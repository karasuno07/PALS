import { Request, Response, Router } from 'express';
import { InvitationRequest } from '../models/invitation';
import AuthService from '../services/auth';
import InvitationService from '../services/invitation';
import { validationHandler } from '../shared/api';
import { InvitationValidator } from '../shared/validator';

const router = Router();

router.get(
  '/user/:userId',
  InvitationValidator.getUserInvitations,
  validationHandler,
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    const invitationList = await InvitationService.getUserInvitations(userId);

    return res.status(200).json(invitationList);
  }
);

router.post(
  '/invite/:groupId',
  InvitationValidator.inviteToGroup,
  validationHandler,
  async (req: Request, res: Response) => {
    const { groupId } = req.params;
    const { senderId, recipientQuery } = req.body as InvitationRequest;

    const createdInvitation = await InvitationService.makeAnInivte({
      senderId,
      recipientQuery,
      groupId,
    });

    return res
      .status(200)
      .json(createdInvitation.toJSON({ flattenObjectIds: true }));
  }
);

router.patch(
  '/accept/:invitationId',
  InvitationValidator.replyInvitation,
  validationHandler,
  async (req: Request, res: Response) => {
    const { invitationId } = req.params;

    const tokenPayload = await AuthService.getTokenPayload(req);

    InvitationService.accept({
      invitationId,
      accepterId: tokenPayload.userId,
    });

    return res.status(200).json(true);
  }
);

router.patch(
  '/decline/:invitationId',
  InvitationValidator.replyInvitation,
  validationHandler,
  async (req: Request, res: Response) => {
    const { invitationId } = req.params;

    InvitationService.decline({
      invitationId,
    });

    return res.status(200).json(true);
  }
);

export default router;
