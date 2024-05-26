import * as yup from 'yup';

type Group = {
  _id: string;
  name: string;
  description: string;
};

export default Group;
export type GroupResponse = Group;
export type GroupRequest = Omit<Group, '_id'>;
export const GroupForm = {
  defaultValues: {
    name: undefined,
    description: undefined,
  },
  validationSchema: yup
    .object<GroupRequest>()
    .shape({
      name: yup
        .string()
        .min(3, 'Group name must be at least 3 characters length')
        .max(10, 'Group name must be at most 3 characters length')
        .required('Group name is required'),
      description: yup.string().required('Group description is required'),
    })
    .required(),
};
