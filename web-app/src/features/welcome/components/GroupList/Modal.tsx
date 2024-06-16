'use client';

import { FormField } from '@/components/Field';
import Icon from '@/components/Icon';
import SubmitButton from '@/components/SubmitButton';
import { GroupRequest } from '@/models/Group';
import { api } from '@/shared/api';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  UseDisclosureReturn,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { MdSearch } from 'react-icons/md';
import { z } from 'zod';

export function SearchGroupModal(disclosureProps: UseDisclosureReturn) {
  return (
    <Modal
      isCentered
      isOpen={disclosureProps.isOpen}
      onClose={disclosureProps.onClose}
      motionPreset='slideInTop'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Group Search</ModalHeader>
        <ModalBody>
          <Box marginX='20px'>
            <InputGroup>
              <Input
                focusBorderColor='#E2E8F0'
                type='text'
                name='group-query'
                placeholder='Enter group ID or group name...'
              />
              <InputRightAddon padding={0}>
                <IconButton
                  aria-label='search-button'
                  icon={
                    <Icon
                      icon={MdSearch}
                      iconProps={{ size: '22px' }}
                      text='Find'
                    />
                  }
                  borderLeftRadius={0}
                  colorScheme='blue'
                />
              </InputRightAddon>
            </InputGroup>
          </Box>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}

export function CreateGroupModal(disclosureProps: UseDisclosureReturn) {
  const router = useRouter();
  const [formError, setFormError] = useState<string | undefined>();

  const formMethods = useForm<GroupRequest>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
    },
    resolver: zodResolver(
      z.object({
        name: z
          .string()
          .trim()
          .min(3, 'Group name must be at least 3 characters length')
          .max(20, 'Group name must be at most 20 characters length'),
      })
    ),
  });

  const onCreateGroupHandler = async ({ name, description }: GroupRequest) => {
    const response = await api('/groups', {
      method: 'POST',
      body: JSON.stringify({
        name,
        description:
          !description || description.length === 0
            ? 'Payments and Loan Sharing'
            : description,
      }),
    });
    if (response.success) {
      formMethods.reset();
      disclosureProps.onClose();
      router.refresh();
    } else {
      setFormError(response.error.message);
    }
  };

  const onClearFormErrorHandler = () => setFormError(undefined);

  const formHasError =
    formMethods.formState.isDirty &&
    Object.keys(formMethods.formState.errors).length > 0;
  const isFormSubmitting = formMethods.formState.isSubmitting;

  return (
    <Modal
      isCentered
      isOpen={disclosureProps.isOpen}
      onClose={disclosureProps.onClose}
      motionPreset='slideInTop'
    >
      <ModalOverlay />
      <FormProvider {...formMethods}>
        <ModalContent
          as='form'
          onSubmit={formMethods.handleSubmit(onCreateGroupHandler)}
        >
          <ModalHeader>Add new group</ModalHeader>
          <ModalBody>
            {formError && (
              <Alert status='error'>
                <AlertIcon />
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}
            <Box display='flex' flexDirection='column' gap={3}>
              <FormField name='name'>
                {({ field, fieldState }) => {
                  const isError = fieldState.isDirty && !!fieldState.error;
                  return (
                    <FormControl isInvalid={isError}>
                      <FormLabel>Name</FormLabel>
                      <Input
                        id='name'
                        onFocus={onClearFormErrorHandler}
                        {...field}
                      />
                      {isError && (
                        <FormErrorMessage>
                          {fieldState.error?.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  );
                }}
              </FormField>
              <FormField name='description'>
                {({ field, fieldState }) => {
                  const isError = fieldState.isDirty && !!fieldState.error;
                  return (
                    <FormControl isInvalid={isError}>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        id='description'
                        onFocus={onClearFormErrorHandler}
                        placeholder='Ex: Payments and Loan Sharing'
                        {...field}
                      />
                      {isError && (
                        <FormErrorMessage>
                          {fieldState.error?.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  );
                }}
              </FormField>
            </Box>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup spacing='10px'>
              <Button
                size='sm'
                variant='outline'
                colorScheme='red'
                onClick={disclosureProps.onClose}
              >
                Close
              </Button>
              <SubmitButton
                size='sm'
                colorScheme='green'
                isLoading={isFormSubmitting}
                isDisabled={formHasError || isFormSubmitting}
              >
                Create
              </SubmitButton>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </FormProvider>
    </Modal>
  );
}

const GroupModal = {
  Search: SearchGroupModal,
  Create: CreateGroupModal,
};

export default GroupModal;
