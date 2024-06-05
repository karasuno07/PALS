import TabContentLayout from '@/features/groups/layouts/TabContentLayout';
import { GroupMember } from '@/models/User';
import { api } from '@/shared/api';
import { getUserFromToken } from '@/shared/token';
import { Heading } from '@chakra-ui/react';
import AddExpenseForm from './AddExpenseForm';

type Props = {
  groupMembers: GroupMember[];
};

async function getGroupMembers(id: string) {
  const response = await api<GroupMember[]>(`/groups/${id}/members`);

  if (!response.success) {
    return [];
  } else {
    response.data.push({
      _id: '123test',
      username: 'user1test',
      name: 'User Test 1',
      balance: 10000,
      isAdmin: false,
    });
    response.data.push({
      _id: '312test',
      username: 'user2test',
      name: 'User Test 2',
      balance: 0,
      isAdmin: false,
    });
    return response.data;
  }
}

export default async function AddExpense({ groupMembers }: Props) {
  const { userId, username } = await getUserFromToken();

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
        members={groupMembers}
      />
    </TabContentLayout>
  );
}
