'use client';

import { FormField, NumberInput } from '@/components/Field';
import MultiSelect from '@/components/MultiSelect';
import SubmitButton from '@/components/SubmitButton';
import { EXPENSE_CATEGORIES } from '@/features/groups/constants';
import User, { GroupMember } from '@/models/User';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  Select,
  Spacer,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ExpenseValues from './ExpenseValues';
import SplitTypeSelector from './SplitTypeSelector';

type Props = {
  currentUser: User;
  members: GroupMember[];
};

type FormValues = {
  name: string;
  date: Date | string;
  category: string;
  payer: string;
  amount: number;
  description: string;
  participants: GroupMember[];
};

export default function AddExpenseForm({ currentUser, members }: Props) {
  const isGroupAdmin = members.find(
    (member) => (member._id = currentUser._id)
  )?.isAdmin;

  const formMethods = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      date: '',
      category: '',
      payer: currentUser._id,
      amount: 0,
      description: '',
      participants: [],
    },
  });

  const [participantOptions, setParticipantOptions] = useState<GroupMember[]>(
    members.filter((member) => member._id !== currentUser._id)
  );

  return (
    <FormProvider {...formMethods}>
      <VStack paddingTop='50px' minHeight='60lvh'>
        <HStack
          as='form'
          justifyContent='center'
          alignItems='flex-start'
          gap='100px'
        >
          <Flex
            flexDirection='column'
            alignItems='center'
            gap={5}
            width='470px'
          >
            <FormField name='name'>
              {({ field, fieldState }) => {
                const hasError = fieldState.isDirty && !!fieldState.error;
                return (
                  <FormControl isInvalid={hasError}>
                    <FormLabel fontWeight='600'>Expense name</FormLabel>
                    <Input
                      id='expense-name'
                      backgroundColor='white'
                      {...field}
                      placeholder='Enter expense name...'
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
            <FormField name='date'>
              {({ field, fieldState }) => {
                const hasError = fieldState.isDirty && !!fieldState.error;
                return (
                  <FormControl isInvalid={hasError}>
                    <FormLabel fontWeight='600'>Expense date</FormLabel>
                    <Input
                      id='expense-date'
                      type='date'
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
            <FormField name='category'>
              {({ field, fieldState }) => {
                const hasError = fieldState.isDirty && !!fieldState.error;
                return (
                  <FormControl isInvalid={hasError} zIndex={2}>
                    <FormLabel fontWeight='600'>
                      Please select expense category:
                    </FormLabel>
                    <MultiSelect
                      isMulti={false}
                      id='expense-category'
                      chakraStyles={{
                        groupHeading(base) {
                          return { ...base, fontSize: '18px' };
                        },
                      }}
                      options={EXPENSE_CATEGORIES.map((group) => {
                        return {
                          label: group.title,
                          options: group.categories.map((category) => ({
                            label: category,
                            value: category,
                          })),
                        };
                      })}
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
            <InputGroup zIndex={1} justifyContent='center' gap='20px'>
              <FormField name='payer'>
                {({ field, fieldState }) => {
                  const { onChange, ...fieldProps } = field;
                  const hasError = fieldState.isDirty && !!fieldState.error;
                  return (
                    <FormControl isInvalid={hasError} maxWidth='250px'>
                      <FormLabel fontWeight='600'>Payer</FormLabel>
                      <Select
                        id='expense-payer'
                        backgroundColor='white'
                        isDisabled={!isGroupAdmin}
                        onChange={(evt) => {
                          const updatedParticipants = members.filter(
                            (member) => member._id !== evt.target.value
                          );
                          setParticipantOptions(updatedParticipants);
                          formMethods.resetField('participants');
                          field.onChange(evt);
                        }}
                        {...fieldProps}
                      >
                        {members.map((member) => (
                          <option
                            key={`payer-${member._id}`}
                            value={member._id}
                          >
                            {member.name}
                          </option>
                        ))}
                      </Select>
                      {hasError && (
                        <FormErrorMessage>
                          {fieldState.error?.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  );
                }}
              </FormField>
              <FormField name='amount'>
                {({ field, fieldState }) => {
                  const hasError = fieldState.isDirty && !!fieldState.error;
                  return (
                    <FormControl isInvalid={hasError} maxWidth='200px'>
                      <FormLabel fontWeight='600'>Amount (VNĐ)</FormLabel>
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
            </InputGroup>
            <FormField name='description'>
              {({ field, fieldState }) => {
                const hasError = fieldState.isDirty && !!fieldState.error;
                return (
                  <FormControl isInvalid={hasError}>
                    <FormLabel fontWeight='600'>Description</FormLabel>
                    <Textarea
                      id='expense-description'
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
          </Flex>
          <Flex flexDirection='column' gap={5} maxWidth='470px'>
            <FormField name='participants'>
              {({ field, fieldState }) => {
                const hasError = fieldState.isDirty && !!fieldState.error;

                return (
                  <FormControl isInvalid={hasError}>
                    <FormLabel fontWeight='600'>Participants</FormLabel>
                    <MultiSelect
                      isMulti
                      id='expense-participants'
                      options={participantOptions}
                      getOptionLabel={(option: any) => option.name}
                      getOptionValue={(option: any) => option._id}
                      {...field}
                      onChange={(evt) => {
                        const expenseAmount = formMethods.watch('amount');
                        if (expenseAmount == 0) {
                          // TODO:
                        } else {
                          field.onChange(evt);
                        }
                      }}
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
            <SplitTypeSelector />
            <ExpenseValues participants={formMethods.watch('participants')} />
          </Flex>
        </HStack>
        <Spacer />
        <SubmitButton colorScheme='green'>Add Expense</SubmitButton>
      </VStack>
    </FormProvider>
  );
}
