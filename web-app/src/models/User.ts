type User = {
  _id: string;
  username: string;
  name?: string;
  email?: string;
  image?: string;
};

export type UserRequest = Omit<User, '_id'>;
export type GroupMember = Omit<User, 'emailVerified'> & {
  balance: number;
  isAdmin: boolean;
};
export default User;
