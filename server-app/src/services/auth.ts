import { compare } from 'bcrypt';
import { Request } from 'express';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { HttpClientError } from '../errors';
import User from '../models/user';
import { ACCESS_TOKEN_SECRET } from '../shared/api';

const AuthService = {
  async login(username: string, password: string) {
    const user = await User.findOne({ username });

    if (!user) {
      throw new HttpClientError({
        name: 'username_not_found',
        message: 'User not found. Please verify your username again',
      });
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpClientError({
        name: 'incorrect_password',
        message: 'Incorrect password. Please try again',
      });
    }

    const jwt = sign(
      {
        userId: user._id,
        username: user.username,
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    return jwt;
  },
  async getTokenPayload(req: Request) {
    const tokenPrefix = 'Bearer ';
    const authorizationHeader = req.headers.authorization!;
    const token = authorizationHeader.substring(tokenPrefix.length);

    const payload = verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;

    return payload;
  },
};

export default AuthService;
