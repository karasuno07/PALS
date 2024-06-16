import { ProjectionType } from 'mongoose';
import { HttpClientError } from '../errors';
import Group from '../models/group';
import User from '../models/user';
import UserService, { DEFAULT_USER_PROJECTION } from './user';

export const DEFAULT_GROUP_PROJECTION = { name: 1, description: 1 };

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
      const groups = Group.find(
        { 'members.memberId': user._id },
        DEFAULT_GROUP_PROJECTION
      );

      return groups;
    }

    return [];
  },
  async findById(
    groupId: string,
    projection: ProjectionType<any> = DEFAULT_GROUP_PROJECTION
  ) {
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
    const group = await GroupService.findById(groupId, {
      ...DEFAULT_GROUP_PROJECTION,
      members: 1,
    });
    const groupMembers = group.members.filter((mem) => mem.memberId != null);

    const memberIds = groupMembers.map((mem) => mem.memberId);
    const members = await User.find(
      {
        _id: {
          $in: memberIds,
        },
      },
      DEFAULT_USER_PROJECTION
    );

    if (members.length === 0) {
      return [];
    }

    const groupMemberMap = new Map(
      groupMembers.map((member) => [member.memberId!.toString(), member])
    );

    return members
      .map((member) => {
        const groupMember = groupMemberMap.get(member.id);
        if (groupMember) {
          return {
            _id: member._id,
            username: member.username,
            name: member.name,
            email: member.email,
            image: member.image,
            balance: groupMember.memberBalance,
            isAdmin: groupMember.isAdmin,
          };
        }
      })
      .filter(Boolean);
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
    const adminUser = await UserService.findById(createBy, {
      ...DEFAULT_USER_PROJECTION,
      groups: 1,
    });

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
  async addMember(groupId: string, memberId: string) {
    const group = await GroupService.findById(groupId, {
      ...DEFAULT_GROUP_PROJECTION,
      members: 1,
    });
    const userToInvite = await User.findById(memberId);

    if (!userToInvite) {
      throw new HttpClientError({
        status: 400,
        name: 'Resources Not Found',
        message: `Not found any user with id ${memberId}`,
      });
    }

    console.log(group);

    group.members.push({
      memberId: userToInvite._id,
      memberBalance: 0,
      isAdmin: false,
    });

    userToInvite.groups.push({
      id: group.id,
      name: group.name,
    });

    group.save();
    userToInvite.save();

    console.log('Add user to group successfully');
  },
  async deleteById(groupId: string) {
    const group = await GroupService.findById(groupId);
    await group.deleteOne();
    console.log('Deleted group with id: ' + groupId);
  },
};

export default GroupService;
