import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { AuthenticationError } from '../errors';
import User from '../models/user';
import { ACCESS_TOKEN_SECRET } from '../shared/api';

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

    const jwt = sign(
      {
        id: user._id,
        username: user.username,
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    return jwt;
  },
};

export default AuthService;
