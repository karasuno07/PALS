import TabContentLayout from '@/features/groups/layouts/TabContentLayout';
import Group from '@/models/Group';
import { GroupMember } from '@/models/User';
import { getUserFromToken } from '@/shared/token';
import GroupMembers from './GroupMembers';
import InviteMemberForm from './InviteMemberForm';

type Props = {
  groupInfo: Group;
  groupMembers: GroupMember[];
};

export default async function GroupManagement({
  groupInfo,
  groupMembers,
}: Props) {
  const { userId, username } = await getUserFromToken();

  const isGroupAdmin = groupMembers.find(
    (member) => (member._id = userId)
  )?.isAdmin;

  return (
    <TabContentLayout tabIndex={4} tabName='Group Management'>
      <GroupMembers members={groupMembers} />
      <InviteMemberForm groupId={groupInfo._id} />
    </TabContentLayout>
  );
}
