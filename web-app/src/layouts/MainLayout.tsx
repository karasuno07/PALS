import { Container, ContainerProps } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import Header, { headerStyles } from './Header';

type Props = PropsWithChildren<
  Omit<ContainerProps, 'as' | 'bgColor' | 'maxWidth' | 'minHeight' | 'padding'>
>;

export default function MainLayout({ children, ...props }: Props) {
  return (
    <>
      <Header />
      <Container
        as='main'
        bgColor='RGBA(0, 0, 0, 0.08)'
        maxWidth='100lvw'
        minHeight={`calc(100lvh - ${headerStyles.container.height})`}
        padding={4}
        {...props}
      >
        {children}
      </Container>
    </>
  );
}
