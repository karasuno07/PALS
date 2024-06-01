'use client';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spacer,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { FormField, PasswordInput } from '../Field';
import { onRegister } from './formAction';
import { RegisterValidationSchema } from './formSchema';

type Props = {};

export default function RegisterForm({}: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction] = useFormState(onRegister, {
    success: null,
    message: '',
  });

  const formMethods = useForm({
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      name: '',
      email: '',
      ...(state.fields ?? {}),
    },
    resolver: zodResolver(RegisterValidationSchema),
  });

  const toast = useToast({
    position: 'bottom-right',
  });

  useEffect(() => {
    if (!state.success && state.message.length > 0) {
      toast({
        title: 'Register Failed',
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
          formMethods.handleSubmit(() => {
            formAction(new FormData(formRef.current!));
          })(evt);
        }}
      >
        <Flex flexDirection='column' gap='10px' width='300px'>
          <FormField name='username'>
            {({ field, fieldState }) => {
              const isError = fieldState.isDirty && !!fieldState.error;
              return (
                <FormControl isInvalid={isError}>
                  <FormLabel>Username</FormLabel>
                  <Input id='username' {...field} />
                  {isError && (
                    <FormErrorMessage>
                      {fieldState.error?.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              );
            }}
          </FormField>
          <FormField name='password'>
            {({ field, fieldState }) => {
              const isError = fieldState.isDirty && !!fieldState.error;
              return (
                <FormControl isInvalid={isError}>
                  <FormLabel>Password</FormLabel>
                  <PasswordInput id='password' {...field} />
                  {isError && (
                    <FormErrorMessage>
                      {fieldState.error?.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              );
            }}
          </FormField>
          <FormField name='confirmPassword'>
            {({ field, fieldState }) => {
              const isError = fieldState.isDirty && !!fieldState.error;
              return (
                <FormControl isInvalid={isError}>
                  <FormLabel>Confirm Password</FormLabel>
                  <PasswordInput id='confirm-password' {...field} />
                  {isError && (
                    <FormErrorMessage>
                      {fieldState.error?.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              );
            }}
          </FormField>
          <FormField name='name'>
            {({ field, fieldState }) => {
              const isError = fieldState.isDirty && !!fieldState.error;
              return (
                <FormControl isInvalid={isError}>
                  <FormLabel>Full Name</FormLabel>
                  <Input id='name' {...field} />
                  {isError && (
                    <FormErrorMessage>
                      {fieldState.error?.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              );
            }}
          </FormField>
          <FormField name='email'>
            {({ field, fieldState }) => {
              const isError = fieldState.isDirty && !!fieldState.error;
              return (
                <FormControl isInvalid={isError}>
                  <FormLabel>Email Address</FormLabel>
                  <Input id='email' {...field} />
                  {isError && (
                    <FormErrorMessage>
                      {fieldState.error?.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              );
            }}
          </FormField>
          <Spacer />
          <Button isDisabled={formHasError} type='submit' colorScheme='red'>
            Create account
          </Button>
        </Flex>
      </Box>
    </FormProvider>
  );
}
