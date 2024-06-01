'use client';

import { FormField } from '@/components/Form';
import { Box, Button, Flex, Spacer, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';
import Link from '../Link';
import { onLogin } from './formAction';
import { LoginValidationSchema } from './formSchema';

export default function LoginForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(onLogin, {
    success: null,
    message: '',
  });

  const formMethods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(LoginValidationSchema),
    defaultValues: {
      username: '',
      password: '',
      ...(state.fields ?? {}),
    },
  });

  const toast = useToast({
    position: 'bottom-right',
  });

  useEffect(() => {
    if (!state.success && state.message.length > 0) {
      toast({
        title: 'Login Failed',
        description: state.message,
        status: 'error',
        isClosable: true,
        duration: 1000,
      });
    }
    return () => {
      toast.closeAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const formHasError =
    formMethods.formState.isDirty &&
    Object.keys(formMethods.formState.errors).length > 0;

  return (
    <FormProvider {...formMethods}>
      <Box
        as='form'
        ref={formRef}
        action={formAction}
        onSubmit={(evt: any) => {
          evt.preventDefault();
          formMethods.handleSubmit(() =>
            formAction(new FormData(formRef.current!))
          )(evt);
        }}
      >
        <Flex flexDirection='column' gap='10px' width='300px'>
          <FormField id='username' name='username' label='Username' />
          <FormField
            id='password'
            name='password'
            type='password'
            label='Password'
          />
          <Flex fontSize={14} flexDirection='row-reverse'>
            <Link
              href='/register'
              color='blue'
              _hover={{ textDecoration: 'underline' }}
            >
              Register
            </Link>
          </Flex>
          <Spacer />
          <Button isDisabled={formHasError} type='submit' colorScheme='red'>
            Login
          </Button>
        </Flex>
      </Box>
    </FormProvider>
  );
}
