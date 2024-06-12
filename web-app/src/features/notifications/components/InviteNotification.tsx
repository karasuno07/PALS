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
import {
  MdClose,
  MdDone,
  MdInfo,
  MdNotifications,
  MdOutlineInfo,
} from 'react-icons/md';

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
                    <Button
                      variant='unstyled'
                      display='inline-flex'
                      justifyContent='center'
                      alignItems='center'
                      minWidth='20px'
                      width='20px'
                      height='20px'
                      _hover={{
                        backgroundColor: '#dddfff80',
                      }}
                    >
                      <Icon as={MdOutlineInfo} color='#000000' boxSize={5} />
                    </Button>
                    <Button
                      variant='unstyled'
                      display='inline-flex'
                      justifyContent='center'
                      alignItems='center'
                      minWidth='20px'
                      width='20px'
                      height='20px'
                      _hover={{
                        backgroundColor: '#dddfff80',
                      }}
                    >
                      <Icon as={MdClose} color='red' boxSize={5} />
                    </Button>
                    <Button
                      variant='unstyled'
                      display='inline-flex'
                      justifyContent='center'
                      alignItems='center'
                      minWidth='20px'
                      width='20px'
                      height='20px'
                      _hover={{
                        backgroundColor: '#dddfff80',
                      }}
                    >
                      <Icon as={MdDone} color='green' boxSize={5} />
                    </Button>
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
