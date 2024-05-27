import User from '../models/user';

const UserService = {
  async findByUsername(username: string) {
    return await User.findOne({ username }, { password: 0 });
  },
};

export default UserService;
