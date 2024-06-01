'use client';

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
  ModalCloseButton,
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
import { FormField } from '../Field';
import Icon from '../Icon';

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
        <ModalCloseButton />
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
          .max(10, 'Group name must be at most 10 characters length'),
        description: z.string().trim().min(1, 'Group description is required'),
      })
    ),
  });

  const onCreateGroupHandler = async (data: GroupRequest) => {
    const response = await api('/groups', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (response.success) {
      disclosureProps.onClose();
      router.refresh();
    } else {
      setFormError(response.error.message);
    }
  };

  const onClearFormErrorHandler = () => setFormError(undefined);

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
          <ModalCloseButton />
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
              <Button size='sm' type='submit' colorScheme='green'>
                Create
              </Button>
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
