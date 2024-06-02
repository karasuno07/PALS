import EmptyData from '@/features/welcome/components/EmptyData';
import GroupList from '@/features/welcome/components/GroupList';
import { GroupResponse } from '@/models/Group';
import { api } from '@/shared/api';
import { getUserFromToken } from '@/shared/token';

export default async function Welcome() {
  const { userId } = await getUserFromToken();

  const response = await api<GroupResponse[]>('/groups/search', {
    method: 'POST',
    body: JSON.stringify({ userId }),
  });

  if (!response.success || response.data.length === 0) return <EmptyData />;

  return <GroupList groups={response.data} />;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
