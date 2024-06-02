import { TabPanel } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import TabNagivation from '../components/TabNagivation';

type TabContentLayoutProps = {
  tabIndex: number;
  tabName: string;
};

export default function TabContentLayout({
  tabIndex,
  tabName,
  children,
}: PropsWithChildren<TabContentLayoutProps>) {
  return (
    <TabPanel tabIndex={tabIndex}>
      <TabNagivation currentTab={tabName} />
      {children}
    </TabPanel>
  );
}
