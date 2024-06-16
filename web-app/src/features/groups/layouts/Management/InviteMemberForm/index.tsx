'use client';

import { FormField } from '@/components/Field';
import SubmitButton from '@/components/SubmitButton';
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
import { useCallback, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { BsPersonFillAdd } from 'react-icons/bs';
import { addMemberAction } from './addMemberAction';
import AddMemberFormValidation from './addMemberSchema';

type Props = {
  currentUserId: string;
  groupId: string;
};

export default function InviteMemberForm({ currentUserId, groupId }: Props) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formError, setFormError] = useState<string | undefined>();

  const [state, formAction] = useFormState(addMemberAction, {
    success: null,
    message: '',
  });

  const formMethods = useForm({
    mode: 'onChange',
    defaultValues: {
      recipientQuery: '',
      ...(state.fields ?? {}),
    },
    resolver: zodResolver(AddMemberFormValidation),
  });

  const onCloseFormHandler = useCallback(() => {
    onClose();
    setFormError(undefined);
    formMethods.reset();
  }, [formMethods, onClose]);

  const onClearFormErrorHandler = () => setFormError(undefined);

  useEffect(() => {
    if (state.success) {
      onCloseFormHandler();
    } else if (state.message.length > 0) {
      setFormError(state.message);
    }
  }, [state.success, state.message, router, formMethods, onCloseFormHandler]);

  return (
    <Box marginTop={8}>
      <Button size='sm' colorScheme='green' onClick={onOpen}>
        Invite More...
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onCloseFormHandler}>
        <ModalOverlay />
        <FormProvider {...formMethods}>
          <ModalContent
            as='form'
            action={formAction}
            onSubmit={(evt: any) => {
              evt.preventDefault();
              formMethods.handleSubmit((data) => {
                const formData = new FormData();
                formData.append('groupId', groupId);
                formData.append('senderId', currentUserId);
                formData.append('recipientQuery', data.recipientQuery);
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
              <FormField name='recipientQuery'>
                {({ field, fieldState }) => {
                  const hasError = !!fieldState.error;
                  return (
                    <FormControl isInvalid={hasError}>
                      <Input
                        id='recipient'
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
              <SubmitButton leftIcon={<BsPersonFillAdd />} colorScheme='green'>
                Invite
              </SubmitButton>
            </ModalFooter>
          </ModalContent>
        </FormProvider>
      </Modal>
    </Box>
  );
}
