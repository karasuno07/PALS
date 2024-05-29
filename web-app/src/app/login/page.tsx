'use client';

import { AuthForm, AuthRequest } from '@/models/Auth';
import AuthService from '@/services/auth';
import { encryptCookieValue } from '@/shared/token';
import {
  AbsoluteCenter,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Spacer,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function Login({}) {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: AuthForm.defaultValues,
    resolver: yupResolver(AuthForm.validationSchema),
  });

  const key = '123';

  const onLoginHandler = async ({ username, password }: AuthRequest) => {
    try {
      const jwt = await AuthService.authenticate(username, password);
      setCookie('gat', jwt, {
        maxAge: 3600,
        encode: encryptCookieValue,
      });
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AbsoluteCenter>
      <Card>
        <CardHeader>Login</CardHeader>
        <CardBody>
          <Flex
            as='form'
            flexDirection='column'
            gap='10px'
            width='300px'
            onSubmit={handleSubmit(onLoginHandler)}
          >
            <FormControl isInvalid={!!errors.username}>
              <FormLabel>Username</FormLabel>
              <Input id='username' {...register('username')} />
              <FormHelperText>{errors.username?.message}</FormHelperText>
            </FormControl>
            <FormControl isInvalid={!!errors.password}>
              <FormLabel>Password</FormLabel>
              <Input id='password' {...register('password')} />
              <FormHelperText>{errors.password?.message}</FormHelperText>
            </FormControl>
            <Spacer />
            <Button type='submit' colorScheme='red'>
              Login
            </Button>
          </Flex>
        </CardBody>
      </Card>
    </AbsoluteCenter>
  );
}
