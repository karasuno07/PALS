import Icon from '@/components/Icon';
import Link from '@/components/Link';
import { Box, Button, Circle, Flex, Spacer } from '@chakra-ui/react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { MdHome } from 'react-icons/md';
import { VscSignOut } from 'react-icons/vsc';

type Props = {};

export const headerStyles = {
  container: {
    bgGradient: 'linear-gradient(90deg, #42576f 0%, #1e3855 20%, #314f92 74%)',
    maxWidth: '100lvw',
    height: '60px',
    paddingX: '20px',
  },
};

export default function Header({}: Props) {
  const signOutAction = async () => {
    'use server';
    cookies().delete('gat');
    redirect('/login');
  };

  return (
    <Flex alignItems='center' {...headerStyles.container}>
      <Link href='/'>
        <Circle size='40px' bgColor='black' color='white'>
          <Icon icon={MdHome} iconProps={{ size: '24px' }} />
        </Circle>
      </Link>
      <Spacer />
      <Box
        as='form'
        action={signOutAction}
        display={cookies().get('gat')?.value ? 'block' : 'none'}
      >
        <Button
          type='submit'
          leftIcon={<VscSignOut size={18} />}
          colorScheme='red'
        >
          Sign out
        </Button>
      </Box>
    </Flex>
  );
}
