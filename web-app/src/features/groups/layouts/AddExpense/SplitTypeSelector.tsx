import { SPLIT_TYPES, SplitType } from '@/features/groups/constants';
import { Button, Flex, FormControl, FormLabel } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  currentSplitType: SplitType | undefined;
  onChangeSplitType: Dispatch<SetStateAction<SplitType | undefined>>;
};

export default function SplitTypeSelector({
  currentSplitType,
  onChangeSplitType,
}: Props) {
  const formContext = useFormContext();
  const participants = formContext.watch('participants');
  // TODO:

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
