'use client';

import { GroupInvitation } from '@/models/Notification';
import {
  Badge,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react';
import { MdNotifications } from 'react-icons/md';

type Props = {
  invitations: GroupInvitation[];
};

export default function InviteNotification({ invitations }: Props) {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Button}
            variant='unstyled'
            position='relative'
            color='white'
            height='40px'
            isDisabled={invitations.length === 0}
            _disabled={{
              color: '#FFFFFF50',
            }}
          >
            <Icon as={MdNotifications} display='block' boxSize='26px' />
            {!isOpen && invitations.length > 0 && (
              <Badge
                colorScheme='whiteAlpha'
                position='absolute'
                right={0}
                top='5px'
                width='16px'
                height='16px'
                textAlign='center'
              >
                {invitations.length}
              </Badge>
            )}
          </MenuButton>
          {invitations.length > 0 && (
            <MenuList paddingY='4px'>
              {invitations.map(({ _id, sender, invitedGroup }) => (
                <Flex
                  key={_id}
                  padding={1}
                  flexDirection='column'
                  alignItems='flex-start'
                ></Flex>
              ))}
            </MenuList>
          )}
        </>
      )}
    </Menu>
  );
}
