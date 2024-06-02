import { ObjectId, ProjectionType } from 'mongoose';
import { HttpClientError } from '../errors';
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
  async findById(groupId: string, projection?: ProjectionType<any>) {
    const group = await Group.findById(groupId, projection);
    if (!group) {
      throw new HttpClientError({
        status: 400,
        name: 'Resource Not Found',
        message: `Not found any group with id ${groupId}`,
      });
    }
    return group;
  },
  async getGroupMembers(groupId: string) {
    const group = await GroupService.findById(groupId);
    const groupMembers = group.members;
    const members = await UserService.findAllByIds(
      groupMembers
        .filter((mem) => mem.memberId != null)
        .map((mem) => mem.memberId as unknown as ObjectId)
    );

    if (members.length === 0) {
      return members;
    }

    return members.map((member) => {
      const mappedGroupMember = groupMembers.find(
        (groupMem) => (groupMem.memberId = member.id)
      );
      return {
        _id: member._id,
        username: member.username,
        name: member.name,
        email: member.email,
        image: member.image,
        balance: mappedGroupMember?.memberBalance || 0,
        isAdmin: mappedGroupMember?.isAdmin,
      };
    });
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
    const group = await GroupService.findById(groupId);
    await Group.findByIdAndDelete(group._id);
    console.log('Deleted group with id: ' + groupId);
  },
};

export default GroupService;
