import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import User, { UserRequest } from '../models/user';
import { ACCESS_TOKEN_SECRET } from '../shared/api';

const UserService = {
  async findByUsername(username: string) {
    return await User.findOne({ username }, { password: 0 });
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
