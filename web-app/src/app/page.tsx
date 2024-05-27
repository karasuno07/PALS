import GroupList from '@/components/GroupList';
import EmptyData from '@/components/GroupList/EmptyData';
import GroupService from '@/services/group';


export default async function Welcome() {
  const groups = await GroupService.search();

  if (!groups || groups.length === 0) return <EmptyData />;

  return <GroupList groups={groups} />;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;