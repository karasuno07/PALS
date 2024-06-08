import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { HttpClientError } from '../errors';
import User, { UserRequest } from '../models/user';
import { ACCESS_TOKEN_SECRET } from '../shared/api';

export const DEFAULT_USER_PROJECTION = {
  name: 1,
  username: 1,
  email: 1,
  emailVerified: 1,
  image: 1,
};

const UserService = {
  async findById(userId: string) {
    const user = await User.findById(userId, { password: 0, groups: 0 });
    if (!user) {
      throw new HttpClientError({
        name: 'Resource Not Found',
        message: `Not found any user with id ${userId}`,
      });
    }
    return user;
  },
  async findByUsername(username: string) {
    const user = await User.findOne({ username }, { password: 0, groups: 0 });
    if (!user) {
      throw new HttpClientError({
        name: 'Resource Not Found',
        message: `Not found any user with username ${username}`,
      });
    }
    return user;
  },
  async findByEmail(email: string) {
    const user = await User.findOne({ email }, { password: 0, groups: 0 });
    if (!user) {
      throw new HttpClientError({
        name: 'Resource Not Found',
        message: `Not found any user with email ${email}`,
      });
    }
    return user;
  },
  async create(user: UserRequest) {
    const hashedPassword = await hash(user.password, 10);
    const newUser = new User({ ...user, password: hashedPassword });
    await newUser.save();

    const jwt = sign(
      { userId: newUser._id, username: newUser.username },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1h',
      }
    );

    return jwt;
  },
};

export default UserService;
