import Group from './Group';
import User from './User';

export type GroupInvitation = {
  _id: string;
  sender: User;
  invitedGroup: Omit<Group, 'description'>;
};
