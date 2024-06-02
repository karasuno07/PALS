import Group from '../models/group';
import UserService from './user';

const GroupService = {
  async search(searchParams: { userId?: string }, page: number, limit: number) {
    if (Object.keys(searchParams).length === 0) {
      return await Group.find()
        .skip(page * limit)
        .limit(limit);
    }
    const { userId } = searchParams;

    if (userId) {
      const user = await UserService.findById(userId);
      const groups = Group.find({ 'members.memberId': user._id });

      return groups;
    }

    return [];
  },
  async findById(groupId: string) {
    return await Group.findById(groupId);
  },
  async create({
    name,
    description,
    createBy,
  }: {
    name: string;
    description: string;
    createBy: string;
  }) {
    const group = new Group({ name, description });
    const adminUser = await UserService.findById(createBy);

    group.members.push({
      memberId: adminUser._id,
      memberBalance: 0,
      isAdmin: true,
    });
    adminUser.groups.push({ id: group._id, name: group.name });

    await adminUser.save();

    await group.save();

    return group;
  },
  async deleteById(groupId: string) {
    await Group.findByIdAndDelete(groupId);
    console.log('Deleted group with id: ' + groupId);
  },
};

export default GroupService;
