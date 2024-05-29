import * as yup from 'yup';

export type AuthRequest = {
  username: string;
  password: string;
};
export type AuthResponse = {
  type: string;
  token: string;
};
export const AuthForm = {
  defaultValues: {
    username: '',
    password: '',
  },
  validationSchema: yup
    .object<AuthRequest>()
    .shape({
      username: yup.string().required('Username is required'),
      password: yup.string().required('Password is required'),
    })
    .required(),
};
