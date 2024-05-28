import { Request, Response, Router } from 'express';
import { UserAuth, UserRequest, UserValidator } from '../models/user';
import AuthService from '../services/auth';
import UserService from '../services/user';
import { validationHandler } from '../shared/api';

const router = Router();

router.post(
  '/login',
  UserValidator.login,
  validationHandler,
  async (req: Request, res: Response) => {
    const { username, password } = req.body as UserAuth;

    const token = await AuthService.login(username, password);

    return res.status(200).json({ token });
  }
);

router.post(
  '/register',
  UserValidator.create,
  validationHandler,
  async (req: Request, res: Response) => {
    const payload = req.body as UserRequest;

    const user = UserService.create(payload);

    return res.status(200).json(user);
  }
);
