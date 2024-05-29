import GroupList from '@/components/GroupList';
import EmptyData from '@/components/GroupList/EmptyData';
import api from '@/shared/api';
import { cookies } from 'next/headers';

export default async function Welcome() {
  const jwt = cookies().get('gat')?.value;
  const data = await api().get('/groups', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  const groups = await data.json();

  if (!groups || groups.length === 0) return <EmptyData />;

  return <GroupList groups={groups} />;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
