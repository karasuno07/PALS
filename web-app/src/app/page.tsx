import GroupList from '@/components/GroupList';
import EmptyData from '@/components/GroupList/EmptyData';
import api from '@/shared/api';
import { decryptCookieValue } from '@/shared/token';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Welcome() {
  const jwt = cookies().get('gat')?.value;

  if (jwt) {
    const decodedToken = decryptCookieValue(jwt);
    const data = await api().get('/groups', {
      headers: {
        Authorization: `Bearer ${decodedToken}`,
      },
    });
    const groups = await data.json();

    if (!groups || groups.length === 0) return <EmptyData />;

    return <GroupList groups={groups} />;
  } else {
    redirect('/login');
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
