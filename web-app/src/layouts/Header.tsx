import Icon from '@/components/Icon';
import Link from '@/components/Link';
import SignOut from '@/features/auth/components/SignOut';
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

export default function Header() {
  return (
    <Flex alignItems='center' {...headerStyles.container}>
      <Link href='/'>
        <Circle size='40px' bgColor='black' color='white'>
          <Icon icon={MdHome} iconProps={{ size: '24px' }} />
        </Circle>
      </Link>
      <Spacer />
      <SignOut />
    </Flex>
  );
}
