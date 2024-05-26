import Group from '@/models/group';

const GroupService = {
  async search(page: number, limit: number) {
    return await Group.find()
      .skip(page * limit)
      .limit(limit);
  },
  async findById(groupId: string) {
    return await Group.findById(groupId);
  },
  async create({ name, description }: { name: string; description: string }) {
    const group = new Group({ name, description });

    await group.save();

    return group;
  },
  async deleteById(groupId: string) {
    await Group.findByIdAndDelete(groupId);
    console.log('Deleted group with id: ' + groupId);
  },
};

export default GroupService;
