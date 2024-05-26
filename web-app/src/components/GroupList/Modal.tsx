'use client';

import { GroupForm, GroupRequest } from '@/models/Group';
import GroupService from '@/services/group';
import {
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
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { MdSearch } from 'react-icons/md';
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
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<GroupRequest>({
    mode: 'onChange',
    defaultValues: GroupForm.defaultValues,
    resolver: yupResolver(GroupForm.validationSchema),
  });

  const onCreateGroupHandler = async (data: GroupRequest) => {
    const success = await GroupService.create(data);
    if (success) {
      disclosureProps.onClose();
      router.refresh();
    } else {
      // TODO:
    }
  };

  return (
    <Modal
      isCentered
      isOpen={disclosureProps.isOpen}
      onClose={disclosureProps.onClose}
      motionPreset='slideInTop'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add new group</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as='form' display='flex' flexDirection='column' gap={3}>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>Name</FormLabel>
              <Input id='group-name' size='sm' {...register('name')} />
              {errors.name && (
                <FormErrorMessage>{errors.name.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.description}>
              <FormLabel>Description</FormLabel>
              <Textarea
                id='group-description'
                size='sm'
                {...register('description')}
              />
              {errors.description && (
                <FormErrorMessage>
                  {errors.description.message}
                </FormErrorMessage>
              )}
            </FormControl>
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
            <Button
              size='sm'
              type='submit'
              colorScheme='green'
              onClick={handleSubmit(onCreateGroupHandler)}
            >
              Create
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

const GroupModal = {
  Search: SearchGroupModal,
  Create: CreateGroupModal,
};

export default GroupModal;
