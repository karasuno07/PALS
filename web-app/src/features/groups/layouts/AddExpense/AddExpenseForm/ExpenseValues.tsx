import { FormField, NumericInput } from '@/components/Field';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '.';

export default function ExpenseValues() {
  const formContext = useFormContext<FormValues>();
  const participants = formContext.watch('participants');
  const splitType = formContext.watch('splitType');

  return (
    <Flex gap={2}>
      {splitType !== undefined &&
        participants.map((participant, idx) => (
          <FormField name={`participants.${idx}.expense`} key={participant._id}>
            {({ field: { value, ...fieldProps }, fieldState }) => {
              const hasError = !!fieldState.error;
              return (
                <FormControl
                  isInvalid={hasError}
                  isReadOnly={splitType === 'Equal Split'}
                >
                  <FormLabel>{participant.name}</FormLabel>
                  <NumericInput
                    backgroundColor='white'
                    readOnly={splitType === 'Equal Split'}
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
