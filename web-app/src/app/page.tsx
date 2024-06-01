import GroupList from '@/components/GroupList';
import EmptyData from '@/components/GroupList/EmptyData';
import { GroupResponse } from '@/models/Group';
import { api } from '@/shared/api';

export default async function Welcome() {
  const response = await api<GroupResponse[]>('/groups');

  if (!response.success || response.data.length === 0) return <EmptyData />;

  return <GroupList groups={response.data} />;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
