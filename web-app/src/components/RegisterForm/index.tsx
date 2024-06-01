'use client';

import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
import { useRef } from 'react';
import { useFormState } from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { FormField } from '../Form';
import { onRegister } from './formAction';

type Props = {};

export default function RegisterForm({}: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction] = useFormState(onRegister, {
    success: null,
    message: '',
  });

  const formMethods = useForm({
    mode: 'onSubmit',
    defaultValues: {},
  });

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
          <FormField id='username' name='username' label='Username' />
          <FormField
            id='password'
            name='password'
            type='password'
            label='Password'
          />
          <FormField
            id='confirm-password'
            name='confirm-password'
            type='password'
            label='Confirm Password'
          />
          <FormField id='name' name='name' label='Full Name' />
          <FormField
            id='email'
            name='email'
            type='email'
            label='Email Address'
          />
          <Spacer />
          <Button isDisabled={formHasError} type='submit' colorScheme='red'>
            Create account
          </Button>
        </Flex>
      </Box>
    </FormProvider>
  );
}
