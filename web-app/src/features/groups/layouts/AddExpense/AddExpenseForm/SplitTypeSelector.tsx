import { SPLIT_TYPES, SplitType } from '@/features/groups/constants';
import { Button, Flex, FormControl, FormLabel } from '@chakra-ui/react';

type Props = {
  currentSplitType: SplitType | undefined;
  onChangeSplitType: (type: SplitType) => void;
};

export default function SplitTypeSelector({
  currentSplitType,
  onChangeSplitType,
}: Props) {
  return (
    <FormControl>
      <FormLabel fontWeight='600'>Please select split type:</FormLabel>
      <Flex columnGap={10} flexWrap='wrap'>
        {SPLIT_TYPES.map((type) => (
          <Button
            key={type}
            variant={'ghost'}
            colorScheme='black'
            isActive={currentSplitType === type}
            fontWeight='750'
            _active={{ bgColor: 'white', color: 'teal' }}
            onClick={() => onChangeSplitType(type)}
          >
            {type}
          </Button>
        ))}
      </Flex>
    </FormControl>
  );
}
