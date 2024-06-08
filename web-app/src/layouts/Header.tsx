import Icon from '@/components/Icon';
import Link from '@/components/Link';
import SignOut from '@/features/auth/components/SignOut';
import InviteNotification from '@/features/notifications/components/InviteNotification';
import { GroupInvitation } from '@/models/Notification';
import { api } from '@/shared/api';
import { getUserFromToken } from '@/shared/token';
import { Circle, Flex, Spacer } from '@chakra-ui/react';
import { MdHome } from 'react-icons/md';

export const headerStyles = {
  container: {
    bgGradient: 'linear-gradient(90deg, #42576f 0%, #1e3855 20%, #314f92 74%)',
    maxWidth: '100lvw',
    height: '60px',
    paddingX: '20px',
  },
};

async function getInviteNotifications(userId: string) {
  const response = await api<GroupInvitation[]>(`/invitations/user/${userId}`);
  if (response.success) {
    return response.data;
  } else {
    return [];
  }
}

export default async function Header() {
  const { userId } = await getUserFromToken();

  const invitations = await getInviteNotifications(userId);

  return (
    <Flex alignItems='center' {...headerStyles.container}>
      <Link href='/'>
        <Circle size='40px' bgColor='black' color='white'>
          <Icon icon={MdHome} iconProps={{ size: '24px' }} />
        </Circle>
      </Link>
      <Spacer />
      <Flex alignItems='center' gap='12px'>
        <InviteNotification invitations={invitations} />
        <SignOut />
      </Flex>
    </Flex>
  );
}
