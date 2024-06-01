import LoginForm from '@/components/LoginForm';
import {
  AbsoluteCenter,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Stack,
} from '@chakra-ui/react';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';

export default function Login({}) {
  return (
    <AbsoluteCenter>
      <Card>
        <CardHeader display='flex' justifyContent='center' paddingBottom={0}>
          <Image src='/images/logo.png' alt='PALS' width={200} height={50} />
        </CardHeader>
        <CardBody>
          <LoginForm />
          <Box position='relative' padding='10'>
            <Divider />
            <AbsoluteCenter bg='white' px='4'>
              Or
            </AbsoluteCenter>
          </Box>
          <Stack direction='column' gap={4}>
            <Button
              leftIcon={<FaGithub size={24} />}
              iconSpacing={5}
              bgColor='#000'
              _hover={{
                bgColor: '#444',
              }}
              colorScheme='blackAlpha'
            >
              Sign in with Github
            </Button>
            <Button leftIcon={<FcGoogle size={24} />} iconSpacing={5}>
              Sign in with Google
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </AbsoluteCenter>
  );
}
