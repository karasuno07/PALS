import { Tab, TabList } from '@chakra-ui/react';
import { TABS } from '../constants';

export default function TabSelector() {
  return (
    <TabList display='flex' flexDirection='column' gap={4}>
      {TABS.map((tab) => (
        <Tab
          key={tab.id}
          tabIndex={tab.id - 1}
          display={tab.visibility ? undefined : 'none'}
        >
          {tab.name}
        </Tab>
      ))}
    </TabList>
  );
}
