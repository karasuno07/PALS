import { Request, Response, Router } from 'express';
import { TokenResponse } from '../models/auth';
import { UserAuth, UserRequest } from '../models/user';
import AuthService from '../services/auth';
import UserService from '../services/user';
import { validationHandler } from '../shared/api';
import { UserValidator } from '../shared/validator';

const router = Router();

router.post(
  '/authenticate',
  UserValidator.authenticate,
  validationHandler,
  async (req: Request, res: Response, next: Function) => {
    const { username, password } = req.body as UserAuth;

    const token = await AuthService.login(username, password);

    return res.status(200).json(TokenResponse.json(token));
  }
);

router.post(
  '/register',
  UserValidator.create,
  validationHandler,
  async (req: Request, res: Response) => {
    const payload = req.body as UserRequest;

    const token = await UserService.create(payload);

    return res.status(201).json(TokenResponse.json(token));
  }
);

export default router;
