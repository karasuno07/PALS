import { SPLIT_TYPES } from '@/features/groups/constants';
import { Button, Flex, FormControl, FormLabel } from '@chakra-ui/react';
import { useState } from 'react';

type Props = {};

export default function SplitTypeSelector({}: Props) {
  const [splitType, setSplitType] = useState<string | undefined>();

  return (
    <FormControl>
      <FormLabel fontWeight='600'>Please select split type:</FormLabel>
      <Flex columnGap={10} flexWrap='wrap'>
        {SPLIT_TYPES.map((type) => (
          <Button
            key={type}
            variant={'ghost'}
            colorScheme='black'
            isActive={splitType === type}
            fontWeight='750'
            _active={{ bgColor: 'white', color: 'teal' }}
            onClick={() => setSplitType(type)}
          >
            {type}
          </Button>
        ))}
      </Flex>
    </FormControl>
  );
}
