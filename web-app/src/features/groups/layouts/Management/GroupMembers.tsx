import { GroupMember } from '@/models/User';
import { Avatar, Box, Heading, List, ListItem, Text } from '@chakra-ui/react';
import { FaUserShield } from 'react-icons/fa6';

type Props = {
  members: GroupMember[];
};

export default function GroupMembers({ members }: Props) {
  return (
    <Box marginTop={20}>
      <Heading size='md' marginBottom={5}>
        Current Group Members
      </Heading>
      <List marginLeft={2}>
        {members.map((member) => (
          <ListItem
            key={member._id}
            display='flex'
            alignItems='center'
            gap='10px'
            marginY={2}
            fontWeight={member.isAdmin ? 'bold' : undefined}
          >
            <Avatar name={member.name} src={member.image} />
            <Text display='flex' alignItems='center' gap='5px'>
              {member.isAdmin && <FaUserShield size={20} color='darkgreen' />}
              {member.name} ({member.email})
            </Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
