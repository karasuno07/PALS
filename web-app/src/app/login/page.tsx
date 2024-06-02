import LoginForm from '@/components/LoginForm';
import OAuth2SignIn from '@/components/OAuth2SignIn';
import {
  AbsoluteCenter,
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from '@chakra-ui/react';
import Image from 'next/image';

export default function Login() {
  return (
    <AbsoluteCenter>
      <Card>
        <CardHeader display='flex' justifyContent='center' paddingBottom={0}>
          <Image
            priority
            src='/images/logo.png'
            alt='PALS'
            width={200}
            height={50}
          />
        </CardHeader>
        <CardBody>
          <LoginForm />
          <Box position='relative' padding='10'>
            <Divider />
            <AbsoluteCenter bg='white' px='4'>
              Or
            </AbsoluteCenter>
          </Box>
          <OAuth2SignIn />
        </CardBody>
      </Card>
    </AbsoluteCenter>
  );
}
