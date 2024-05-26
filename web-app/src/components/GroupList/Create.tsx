import { IconButton, UseDisclosureReturn } from '@chakra-ui/react';
import { MdOutlineAdd } from 'react-icons/md';
import Icon from '../Icon';
import GroupModal from './Modal';

export function CreateButton({ onToggle }: UseDisclosureReturn) {
  return (
    <IconButton
      aria-label='create-group'
      colorScheme='green'
      icon={<Icon icon={MdOutlineAdd} iconProps={{ size: 20 }} text='Create' />}
      paddingX={4}
      onClick={onToggle}
    />
  );
}

const Create = {
  Button: CreateButton,
  Form: GroupModal.Create,
};

export default Create;
