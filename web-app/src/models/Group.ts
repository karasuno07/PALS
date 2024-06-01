type Group = {
  _id: string;
  name: string;
  description: string;
};

export default Group;
export type GroupResponse = Group;
export type GroupRequest = Omit<Group, '_id'>;
