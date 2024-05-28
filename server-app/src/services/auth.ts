import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { AuthenticationError } from '../errors';
import User from '../models/user';

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || 'ACCESSTOKENSECRET';
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || 'REFRESH_TOKEN_SECRET';

const AuthService = {
  async login(username: string, password: string) {
    const user = await User.findOne({ username });

    if (!user) {
      throw new AuthenticationError(
        'username_not_found',
        'User not found. Please verify your username again'
      );
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new AuthenticationError(
        'incorrect_password',
        'Incorrect password. Please try again'
      );
    }
    const tokenPayload = {
      id: user._id,
    };

    const jwt = sign(tokenPayload, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    return jwt;
  },
};

export default AuthService;
