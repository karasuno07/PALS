import TabContentLayout from '@/features/groups/layouts/TabContentLayout';
import Group from '@/models/Group';
import { GroupMember } from '@/models/User';
import { Box, Heading, List, ListItem, Text } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa6';
import InviteMemberForm from './InviteMemberForm';

type Props = {
  groupInfo: Group;
  groupMembers: GroupMember[];
};

export default function GroupManagement({ groupInfo, groupMembers }: Props) {
  return (
    <TabContentLayout tabIndex={4} tabName='Group Management'>
      <Box marginTop={20}>
        <Heading size='md'>Current Group Members</Heading>
        <List>
          {groupMembers.map((member) => (
            <ListItem
              key={member._id}
              display='flex'
              alignItems='center'
              gap='10px'
              marginY={2}
            >
              <FaUser size={24} />
              <Text>
                {member.name} ({member.email})
              </Text>
            </ListItem>
          ))}
        </List>
      </Box>
      <InviteMemberForm groupId={groupInfo._id} />
    </TabContentLayout>
  );
}
