'use client';

import Group from '@/models/Group';
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';
import Create from './Create';
import List from './List';
import Search from './Search';

type Props = {
  groups: Group[];
};

export default function GroupList({ groups }: Props) {
  const searchDisclosure = useDisclosure();
  const createDisclosure = useDisclosure();

  return (
    <Card margin='auto' maxWidth='600px'>
      <CardHeader display='flex' alignItems='center'>
        <Heading size='md'>Your Groups</Heading>
        <Spacer />
        <Flex gap={2}>
          <Search.Button {...searchDisclosure} />
          <Create.Button {...createDisclosure} />
        </Flex>
      </CardHeader>
      <Search.Input {...searchDisclosure} />
      <Create.Form {...createDisclosure} />
      <CardBody>
        <List groups={groups} />
      </CardBody>
    </Card>
  );
}
