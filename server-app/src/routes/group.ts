import { Request, Response, Router } from 'express';
import Group from '../models/group';
import AuthService from '../services/auth';
import GroupService from '../services/group';
import { validationHandler } from '../shared/api';
import { GroupValidator } from '../shared/validator';

const router = Router();

router.post('/search', async (req: Request, res: Response) => {
  const body = req.body;

  const userId = body ? body.userId : undefined;
  const page = body ? Number(body.page as string) : 0;
  const limit = body ? Number(body.limit as string) : 20;

  const searchParams = userId ? { userId } : {};

  const groups = await GroupService.search(searchParams, page, limit);

  return res.status(200).json(groups);
});

router.get(
  '/:groupId',
  GroupValidator.findById,
  validationHandler,
  async (req: Request, res: Response) => {
    const { groupId } = req.params;

    const group = await Group.findById(groupId);

    return res.status(200).json(group);
  }
);

router.post(
  '/',
  GroupValidator.create,
  validationHandler,
  async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const tokenPayload = await AuthService.getTokenPayload(req);
    console.log('Token:', tokenPayload);

    const createdGroup = await GroupService.create({
      name,
      description,
      createBy: tokenPayload.userId,
    });

    return res.status(201).json(createdGroup);
  }
);

router.post(
  '/:groupId/addUser',
  GroupValidator.addUser,
  validationHandler,
  async (req: Request, res: Response) => {
    const { groupId } = req.params;
    const { email } = req.body;
  }
);

router.delete(
  '/:groupId',
  GroupValidator.delete,
  validationHandler,
  async (req: Request, res: Response) => {
    const { groupId } = req.params;

    await GroupService.deleteById(groupId);

    return res.status(200).json(true);
  }
);

export default router;
