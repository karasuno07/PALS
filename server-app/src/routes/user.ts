import { Request, Response, Router } from 'express';
import UserService from '../services/user';
import { validationHandler } from '../shared/api';
import { UserValidator } from '../shared/validator';

const router = Router();

router.get(
  '/:username',
  UserValidator.findByUsername,
  validationHandler,
  async (req: Request, res: Response) => {
    const { username } = req.params;

    const user = await UserService.findByUsername(username);

    return res.status(200).json(user);
  }
);

export default router;
