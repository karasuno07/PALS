import Icon from '@/components/Icon';
import {
  Box,
  Collapse,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  UseDisclosureReturn,
} from '@chakra-ui/react';
import { BiCollapse } from 'react-icons/bi';
import { MdSearch } from 'react-icons/md';

export function SearchButton({ isOpen, onToggle }: UseDisclosureReturn) {
  return (
    <IconButton
      aria-label='join-groups'
      colorScheme={isOpen ? undefined : 'blue'}
      icon={
        isOpen ? (
          <Icon icon={BiCollapse} iconProps={{ size: 20 }} />
        ) : (
          <Icon icon={MdSearch} iconProps={{ size: 20 }} text='Find' />
        )
      }
      paddingX={4}
      onClick={onToggle}
    />
  );
}

export function SearchInput({ isOpen }: UseDisclosureReturn) {
  return (
    <Collapse in={isOpen} animateOpacity>
      <Box marginX='20px'>
        <InputGroup>
          <Input
            focusBorderColor='#E2E8F0'
            type='text'
            name='group-query'
            placeholder='Search for group...'
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
              colorScheme={isOpen ? 'blue' : undefined}
            />
          </InputRightAddon>
        </InputGroup>
      </Box>
    </Collapse>
  );
}

const Search = {
  Button: SearchButton,
  Input: SearchInput,
};

export default Search;
