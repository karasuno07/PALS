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

  return (
    <TabContentLayout tabIndex={4} tabName='Group Management'>
      <GroupMembers currentUserId={userId} members={groupMembers} />
      <InviteMemberForm currentUserId={userId} groupId={groupInfo._id} />
    </TabContentLayout>
  );
}
