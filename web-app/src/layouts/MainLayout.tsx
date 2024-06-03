import { TOKEN_COOKIE_SECRET } from '@/constants';
import { Container, ContainerProps } from '@chakra-ui/react';
import { cookies } from 'next/headers';
import { PropsWithChildren } from 'react';
import Header, { headerStyles } from './Header';

type Props = PropsWithChildren<
  Omit<ContainerProps, 'as' | 'bgColor' | 'maxWidth' | 'minHeight' | 'padding'>
>;

export default function MainLayout({ children, ...props }: Props) {
  const isUserLoggedIn = !!cookies().get(TOKEN_COOKIE_SECRET)?.value;

  return (
    <>
      {isUserLoggedIn && <Header />}
      <Container
        as='main'
        bgColor='RGBA(0, 0, 0, 0.08)'
        maxWidth='100lvw'
        minHeight={`calc(100lvh - ${headerStyles.container.height})`}
        height={isUserLoggedIn ? undefined : '100lvh'}
        padding={4}
        {...props}
      >
        {children}
      </Container>
    </>
  );
}
