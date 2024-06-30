import { FormField } from '@/components/Field';
import { SPLIT_TYPES, SplitType } from '@/features/groups/constants';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  VisuallyHiddenInput,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '.';

type Props = {
  onChangeSplitType: (type: SplitType) => void;
};

export default function SplitTypeSelector({ onChangeSplitType }: Props) {
  const formContext = useFormContext<FormValues>();
  const splitType = formContext.watch('splitType');

  return (
    <FormField name='splitType'>
      {({ field, fieldState }) => {
        const hasError = !!fieldState.error;

        return (
          <FormControl isInvalid={hasError}>
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
                  onClick={() => onChangeSplitType(type)}
                >
                  {type}
                </Button>
              ))}
            </Flex>
            <VisuallyHiddenInput {...field} />
            {hasError && (
              <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
            )}
          </FormControl>
        );
      }}
    </FormField>
  );
}
