'use server';

import { BASE_URL } from '@/constants';
import { GroupResponse } from '@/models/Group';
import { api } from '@/shared/api';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function fetchUserGroups() {
  const jwt = cookies().get('gat')?.value;

  if (jwt) {
    const response = await fetch(BASE_URL + '/groups', {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    if (response.ok) {
      const data = await response.json();

      return data as GroupResponse[];
    }
  } else {
    redirect('/login');
  }
}

export async function fetchUserGroups2() {
  const data = await api<GroupResponse[]>('/groups');
}
