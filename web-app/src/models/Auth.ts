export type AuthRequest = {
  username: string;
  password: string;
};
export type AuthResponse = {
  type: string;
  token: string;
};
