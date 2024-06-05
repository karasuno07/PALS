'use client';

import { FormField } from '@/components/Field';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { BsPersonFillAdd } from 'react-icons/bs';
import { addMemberAction } from './addMemberAction';
import AddMemberFormValidation from './addMemberSchema';

type Props = {
  groupId: string;
};

export default function InviteMemberForm({ groupId }: Props) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formError, setFormError] = useState<string | undefined>();

  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(addMemberAction, {
    success: null,
    message: '',
  });

  const formMethods = useForm({
    mode: 'onChange',
    defaultValues: {
      invitationQuery: '',
      ...(state.fields ?? {}),
    },
    resolver: zodResolver(AddMemberFormValidation),
  });

  const onCloseFormHandler = () => {
    onClose();
    formMethods.reset();
  };

  const onClearFormErrorHandler = () => setFormError(undefined);

  useEffect(() => {
    if (state.success) {
      formMethods.reset();
      router.refresh(); // TODO: keep on the same tab after close the modal
    } else if (state.message.length > 0) {
      setFormError(state.message);
    }
  }, [state.success, state.message, router, formMethods]);

  return (
    <Box marginTop={10}>
      <Button size='sm' variant='outline' colorScheme='yellow' onClick={onOpen}>
        Invite people to group
      </Button>
      <Modal isOpen={isOpen} onClose={onCloseFormHandler}>
        <ModalOverlay />
        <FormProvider {...formMethods}>
          <ModalContent
            ref={formRef}
            as='form'
            action={formAction}
            onSubmit={(evt: any) => {
              evt.preventDefault();
              formMethods.handleSubmit((data) => {
                const formData = new FormData();
                formData.append('groupId', groupId);
                formData.append('invitationQuery', data.invitationQuery);
                formAction(formData);
              })(evt);
            }}
          >
            <ModalHeader>Group Invitation</ModalHeader>
            <ModalCloseButton />
            {formError && (
              <Alert status='error'>
                <AlertIcon />
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}
            <ModalBody>
              <FormField name='invitationQuery'>
                {({ field, fieldState }) => {
                  const hasError = !!fieldState.error;
                  return (
                    <FormControl isInvalid={hasError}>
                      <Input
                        id='invitation-query'
                        placeholder='Enter people email or username to invite them...'
                        {...field}
                        onFocus={onClearFormErrorHandler}
                      />
                      {hasError && (
                        <FormErrorMessage>
                          {fieldState.error?.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  );
                }}
              </FormField>
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={onCloseFormHandler}>
                Close
              </Button>
              <Button
                type='submit'
                leftIcon={<BsPersonFillAdd />}
                colorScheme='green'
              >
                Invite
              </Button>
            </ModalFooter>
          </ModalContent>
        </FormProvider>
      </Modal>
    </Box>
  );
}
