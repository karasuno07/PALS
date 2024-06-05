import TabSelector from '@/features/groups/components/TabSelector';
import {
  AddExpense,
  Balances,
  Dashboard,
  ExpensesHistory,
  Greetings,
  GroupManagement,
} from '@/features/groups/layouts';
import { headerStyles } from '@/layouts/Header';
import { GroupResponse } from '@/models/Group';
import { api } from '@/shared/api';
import { Box, HStack, Heading, TabPanels, Tabs } from '@chakra-ui/react';
import { redirect } from 'next/navigation';

const styles = {
  tabs: {
    paddingLeft: '16px',
    paddingRight: '8px',
    paddingTop: '16px',
    paddingBottom: '16px',
  },
};

type Props = {
  params: {
    id: string;
  };
};

export default async function GroupHome({ params: { id } }: Props) {
  const response = await api<GroupResponse>(`/groups/${id}`);

  if (response.success) {
    const info = response.data as GroupResponse;

    return (
      <Tabs isLazy as='nav' variant='soft-rounded' colorScheme='red'>
        <HStack alignItems='flex-start'>
          <Box minWidth='200px'>
            <Heading
              textAlign='center'
              size='md'
              fontSize='24px'
              height='50px'
              color='green.700'
            >
              {info.name}
            </Heading>
            <TabSelector />
          </Box>
          <Box w='100%'>
            <TabPanels
              bgColor='RGBA(0, 0, 0, 0.04)'
              borderRadius={2}
              width='100%'
              minHeight={`calc(100lvh - ${headerStyles.container.height} - ${styles.tabs.paddingTop} - ${styles.tabs.paddingBottom})`}
            >
              <Greetings />
              <Dashboard />
              <Balances />
              <AddExpense groupId={info._id} />
              <ExpensesHistory />
              <GroupManagement />
            </TabPanels>
          </Box>
        </HStack>
      </Tabs>
    );
  } else {
    redirect('/');
  }
}
