'use client';

import SubmitButton from '@/components/SubmitButton';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonGroup,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { VscSignOut } from 'react-icons/vsc';
import { signOutAction } from './signOutAction';

type Props = {
  show: boolean;
};

export default function SignOut({ show }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  if (!show) return undefined;

  return (
    <>
      <Button
        leftIcon={<VscSignOut size={18} />}
        colorScheme='red'
        onClick={onOpen}
      >
        Sign out
      </Button>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent as='form' action={signOutAction}>
          <AlertDialogHeader>Confirmation</AlertDialogHeader>
          <AlertDialogBody textAlign='center'>
            <Text>Are you sure want to logout?</Text>
            <Text>This action will redirect you to Login page</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup spacing='10px'>
              <Button size='sm' variant='outline' onClick={onClose}>
                Close
              </Button>
              <SubmitButton size='sm'>Sign out</SubmitButton>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
