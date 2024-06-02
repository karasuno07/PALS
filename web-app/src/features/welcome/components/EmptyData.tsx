'use client';

import Icon from '@/components/Icon';
import { AbsoluteCenter, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import { MdOutlineAdd, MdSearch } from 'react-icons/md';
import GroupModal from './GroupList/Modal';

type Props = {};

export default function EmptyData() {
  const searchDisclosure = useDisclosure();
  const createDisclosure = useDisclosure();

  return (
    <AbsoluteCenter
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <Heading size='lg' textAlign='center'>
        You currently do not belong any group
      </Heading>
      <Flex justifyContent='center' marginTop={2} gap={2}>
        <Icon
          icon={MdSearch}
          iconProps={{ size: 20 }}
          text='Find a group to join'
          containerProps={{
            cursor: 'pointer',
            _hover: { color: 'blue.500' },
          }}
          onClick={searchDisclosure.onOpen}
        />
        <Icon
          icon={MdOutlineAdd}
          iconProps={{ size: 20 }}
          text='Create your own group'
          containerProps={{
            cursor: 'pointer',
            _hover: { color: 'green.500' },
          }}
          onClick={createDisclosure.onOpen}
        />
      </Flex>
      <GroupModal.Search {...searchDisclosure} />
      <GroupModal.Create {...createDisclosure} />
    </AbsoluteCenter>
  );
}
