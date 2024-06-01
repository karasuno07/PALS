import { headerStyles } from '@/layouts/Header';
import { GroupResponse } from '@/models/Group';
import { api } from '@/shared/api';
import {
  Box,
  HStack,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
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
    const details = response.data;

    return (
      <Tabs as='nav' variant='soft-rounded' colorScheme='red'>
        <HStack alignItems='flex-start'>
          <Box minWidth='200px'>
            <Heading
              textAlign='center'
              size='lg'
              height='50px'
              color='green.700'
            >
              {details.name}
            </Heading>
            <TabList display='flex' flexDirection='column' gap={4}>
              <Tab>Dashboard</Tab>
              <Tab>Balances</Tab>
              <Tab>Add Expense</Tab>
              <Tab>Expenses History</Tab>
            </TabList>
          </Box>
          <Box w='100%'>
            <TabPanels
              bgColor='RGBA(0, 0, 0, 0.04)'
              borderRadius={2}
              width='100%'
              minHeight={`calc(100lvh - ${headerStyles.container.height} - ${styles.tabs.paddingTop} - ${styles.tabs.paddingBottom})`}
            >
              <TabPanel>Dashboard</TabPanel>
              <TabPanel>Balances</TabPanel>
              <TabPanel>Add Expense</TabPanel>
              <TabPanel>Expenses History</TabPanel>
            </TabPanels>
          </Box>
        </HStack>
      </Tabs>
    );
  } else {
    redirect('/');
  }

  
}
