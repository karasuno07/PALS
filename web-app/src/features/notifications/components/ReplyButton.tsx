import { GroupInvitation } from '@/models/Notification';
import { api } from '@/shared/api';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  ButtonGroup,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdReply } from 'react-icons/md';

type Props = {
  invitation: GroupInvitation;
};

export default function ReplyButton({
  invitation: { _id, sender, invitedGroup },
}: Props) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const onDeclineHandler = async () => {
    setLoading(true);
    const response = await api(`/invitations/decline/${_id}`, {
      method: 'PATCH',
    });
    if (response.success) {
      onClose();
      router.refresh();
    } else {
      setError(response.error.message);
    }
    setLoading(false);
  };

  const onAcceptHandler = async () => {
    setLoading(true);
    const response = await api(`/invitations/accept/${_id}`, {
      method: 'PATCH',
    });
    if (response.success) {
      onClose();
      router.replace('/');
      router.refresh();
    } else {
      setError(response.error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Button
        variant='unstyled'
        display='inline-flex'
        justifyContent='center'
        alignItems='center'
        minWidth='20px'
        width='20px'
        height='20px'
        _hover={{
          backgroundColor: '#dddfff40',
        }}
        onClick={() => onOpen()}
      >
        <Icon as={MdReply} color='green.500' boxSize={5} />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Accept Invitation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {error && (
              <Alert status='error'>
                <AlertIcon />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Text as='b'>
              {sender.name} ({sender.email})
            </Text>
            <Text>
              sent you an invitation to join group{' '}
              <Text as='b'>{invitedGroup.name}</Text>
            </Text>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup spacing='10px'>
              <Button
                size='sm'
                colorScheme='red'
                isLoading={loading}
                isDisabled={loading}
                onClick={onDeclineHandler}
              >
                Decline
              </Button>
              <Button
                size='sm'
                colorScheme='green'
                isLoading={loading}
                isDisabled={loading}
                onClick={onAcceptHandler}
              >
                Accept
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
