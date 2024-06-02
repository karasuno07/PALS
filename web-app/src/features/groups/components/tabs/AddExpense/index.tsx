import TabContentLayout from '@/features/groups/layouts/TabContentLayout';
import { GroupMember } from '@/models/User';
import { api } from '@/shared/api';
import { getUserFromToken } from '@/shared/token';
import { Heading } from '@chakra-ui/react';
import AddExpenseForm from './AddExpenseForm';

type Props = {
  groupId: string;
};

async function getGroupMembers(id: string) {
  const response = await api<GroupMember[]>(`/groups/${id}/members`);

  if (!response.success) {
    return [];
  } else {
    return response.data;
  }
}

export default async function AddExpense({ groupId }: Props) {
  const { userId, username } = await getUserFromToken();
  const members = await getGroupMembers(groupId);

  return (
    <TabContentLayout tabIndex={3} tabName='Add Expense'>
      <Heading width='100%' textAlign='center'>
        Add New Expense
      </Heading>
      <AddExpenseForm
        currentUser={{
          _id: userId,
          username: username,
        }}
        members={members}
      />
    </TabContentLayout>
  );
}
