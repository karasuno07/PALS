import User from './User';

export type GroupInvitation = {
  _id: string;
  sender: User;
  invitedGroup: {
    id: string;
    name: string;
  };
};
