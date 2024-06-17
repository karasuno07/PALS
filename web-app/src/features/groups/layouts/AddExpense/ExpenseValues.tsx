import { FormField, NumberInput } from '@/components/Field';
import { GroupMember } from '@/models/User';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react';
import { SplitType } from '../../constants';

type Props = {
  splitType?: SplitType;
  totalExpenseAmount: number;
  participants: GroupMember[];
};

export default function ExpenseValues({
  splitType,
  totalExpenseAmount,
  participants,
}: Props) {
  return (
    <Flex gap={2}>
      {splitType !== undefined &&
        participants.map((participant, idx) => (
          <FormField name={`participants.${idx}.expense`} key={participant._id}>
            {({ field: { value, ...fieldProps }, fieldState }) => {
              const hasError = fieldState.isDirty && !!fieldState.error;
              return (
                <FormControl
                  isInvalid={hasError}
                  isReadOnly={splitType === 'Equal Split'}
                >
                  <FormLabel>{participant.name}</FormLabel>
                  <NumberInput
                    backgroundColor='white'
                    min={0}
                    step={500}
                    currency='VNĐ'
                    value={String(value || 0)}
                    {...fieldProps}
                  />
                  {hasError && (
                    <FormErrorMessage>
                      {fieldState.error?.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              );
            }}
          </FormField>
        ))}
    </Flex>
  );
}
