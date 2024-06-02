import Group from '../models/group';
import UserService from './user';

const GroupService = {
  async search(page: number, limit: number) {
    return await Group.find()
      .skip(page * limit)
      .limit(limit);
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
    adminUser.groups.push({ groupId: group._id, groupName: group.name });

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
