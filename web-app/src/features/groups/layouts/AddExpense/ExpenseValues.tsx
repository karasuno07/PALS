import { FormField, NumberInput } from '@/components/Field';
import { GroupMember } from '@/models/User';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react';

type Props = {
  participants: GroupMember[];
};

export default function ExpenseValues({ participants }: Props) {
  return (
    <Flex gap={2}>
      {participants.map((participant) => (
        <FormField name={`${participant.name}.expense`} key={participant._id}>
          {({ field, fieldState }) => {
            const hasError = fieldState.isDirty && !!fieldState.error;
            return (
              <FormControl isInvalid={hasError}>
                <FormLabel>{participant.name}</FormLabel>
                <NumberInput
                  min={0}
                  step={1000}
                  currency='VNĐ'
                  backgroundColor='white'
                  {...field}
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
