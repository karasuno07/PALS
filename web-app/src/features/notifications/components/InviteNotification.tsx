'use client';

import { GroupInvitation } from '@/models/Notification';
import {
  Badge,
  Button,
  ButtonGroup,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { MdInfo, MdNotifications } from 'react-icons/md';
import ReplyButton from './ReplyButton';

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
            <MenuList paddingY='4px' minWidth='unset'>
              {invitations.map((invitation) => (
                <Flex
                  key={invitation._id}
                  padding={1}
                  alignItems='center'
                  color='blue.500'
                  margin='5px 10px'
                >
                  <Icon as={MdInfo} boxSize={5} marginRight='5px' />
                  <Text fontSize={12} fontWeight='bold'>
                    Group Invitation
                  </Text>
                  <Spacer />
                  <ButtonGroup
                    display='flex'
                    alignItems='center'
                    marginLeft='10px'
                  >
                    <ReplyButton invitation={invitation} />
                  </ButtonGroup>
                </Flex>
              ))}
            </MenuList>
          )}
        </>
      )}
    </Menu>
  );
}
