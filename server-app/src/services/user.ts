import { hash } from 'bcrypt';
import User, { UserRequest } from '../models/user';

const UserService = {
  async findByUsername(username: string) {
    return await User.findOne({ username }, { password: 0 });
  },
  async create(user: UserRequest) {
    const hashedPassword = hash(user.password, 10);
    const newUser = new User({ ...user, password: hashedPassword });
    await newUser.save();
    return newUser;
  },
};

export default UserService;
