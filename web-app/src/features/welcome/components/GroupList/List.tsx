import Icon from '@/components/Icon';
import Link from '@/components/Link';
import Group from '@/models/Group';
import { api } from '@/shared/api';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  ButtonGroup,
  Circle,
  Heading,
  Spacer,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import { MdClose } from 'react-icons/md';

type Props = {
  groups: Group[];
};

export default function List({ groups }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const onOpenDeleteModal = (groupId: string) => {
    router.push(`?${new URLSearchParams({ id: groupId })}`);
    onOpen();
  };

  const onCloseDeleteModal = () => {
    router.push('?');
    onClose();
  };

  const onRemoveGroupHandler = async () => {
    const groupId = searchParams.get('id') as string;
    const response = await api(`/groups/${groupId}`, { method: 'DELETE' });
    if (response.success) {
      onClose();
      router.refresh();
    } else {
      // TODO:
    }
  };

  return (
    <>
      <Stack divider={<StackDivider />} spacing={4}>
        {groups.map((group) => (
          <Box key={group._id} display='flex' alignItems='center'>
            <Link href={`/group/${group._id}`}>
              <Heading size='xs' textTransform='uppercase'>
                {group.name}
              </Heading>
              <Text pt='2' fontSize='sm'>
                {group.description}
              </Text>
            </Link>
            <Spacer />
            <Circle
              size='24px'
              cursor='pointer'
              _hover={{ bgColor: 'tomato', color: 'white' }}
              onClick={onOpenDeleteModal.bind(null, group._id)}
            >
              <Icon icon={MdClose} />
            </Circle>
          </Box>
        ))}
      </Stack>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onCloseDeleteModal}
        motionPreset='slideInBottom'
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Group
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <ButtonGroup size='sm' gap={2}>
                <Button ref={cancelRef} onClick={onCloseDeleteModal}>
                  Cancel
                </Button>
                <Button colorScheme='red' onClick={onRemoveGroupHandler}>
                  Delete
                </Button>
              </ButtonGroup>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
