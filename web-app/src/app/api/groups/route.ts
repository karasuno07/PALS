import { GroupResponse } from '@/models/Group';
import api, { apiHandler } from '@/shared/api';
import { NextRequest, NextResponse } from 'next/server';

async function getGroups(req: NextRequest, res: NextResponse) {
  const authorizationHeader = {
    Authorization: req.headers.get('Authorization') as string,
  };

  const response = await api().get('/groups', {
    headers: authorizationHeader,
  });

  const groups = (await response.json()) as GroupResponse[];

  return NextResponse.json(groups, { status: 200 });
}

module.exports = apiHandler({
  GET: getGroups,
});
