import TabContentLayout from '@/features/groups/layouts/TabContentLayout';
import { GroupMember } from '@/models/User';
import { getUserFromToken } from '@/shared/token';
import { Heading } from '@chakra-ui/react';
import AddExpenseForm from './AddExpenseForm';

type Props = {
  groupMembers: GroupMember[];
};

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
