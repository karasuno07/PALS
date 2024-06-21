'use client';

import { FormField, NumericInput } from '@/components/Field';
import SubmitButton from '@/components/SubmitButton';
import { EXPENSE_CATEGORIES, SplitType } from '@/features/groups/constants';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { Select as ReactSelect } from 'chakra-react-select';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ExpenseValues from './ExpenseValues';
import SplitTypeSelector from './SplitTypeSelector';
import { AddExpenseFormValidationSchema } from './formSchema';

type Props = {
  currentUser: User;
  members: GroupMember[];
};

type Participant = GroupMember & { expense: string | number };

export type FormValues = {
  name: string;
  date: Date | string;
  category: string;
  payer: string;
  amount: number;
  description: string;
  participants: Participant[];
};

export default function AddExpenseForm({ currentUser, members }: Props) {
  const isGroupAdmin = members.find(
    (member) => member._id === currentUser._id
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
    resolver: zodResolver(AddExpenseFormValidationSchema),
  });

  const [participantOptions, setParticipantOptions] = useState<GroupMember[]>(
    members.filter((member) => member._id !== currentUser._id)
  );
  const [splitType, setSplitType] = useState<SplitType | undefined>();

  const calculateExpenses = useCallback(
    function (params?: { totalAmount?: number; participants?: Participant[] }) {
      const totalAmount = params?.totalAmount || formMethods.watch('amount');
      const participants =
        params?.participants || formMethods.watch('participants');

      const updatedParticipants = participants.map((participant) => {
        let expense = 0;
        if (splitType === 'Equal Split') {
          expense = totalAmount / participants.length;
        }
        return { ...participant, expense };
      });
      formMethods.reset({
        participants: updatedParticipants,
        amount: totalAmount,
      });
    },
    [formMethods, splitType]
  );

  const onChangeSplitType = (type: SplitType) => {
    setSplitType(type);
    calculateExpenses();
  };

  const onSubmitAddExpense = (data: FormValues) => {
    console.log(data);
  };

  return (
    <FormProvider {...formMethods}>
      <VStack
        as='form'
        paddingTop='50px'
        minHeight='60lvh'
        onSubmit={formMethods.handleSubmit(onSubmitAddExpense)}
      >
        <HStack justifyContent='center' alignItems='flex-start' gap='100px'>
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
                    <ReactSelect
                      instanceId='category'
                      id='expense-category'
                      useBasicStyles
                      chakraStyles={{
                        groupHeading(base) {
                          return { ...base, fontSize: '18px' };
                        },
                        control(base) {
                          return { ...base, backgroundColor: 'white' };
                        },
                        menuList(base) {
                          return { ...base, paddingY: 0 };
                        },
                      }}
                      options={EXPENSE_CATEGORIES.map((option) => {
                        return {
                          label: option.title,
                          options: option.categories.map((category) => ({
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
                      <NumericInput
                        min={0}
                        step={1000}
                        currency='VNĐ'
                        backgroundColor='white'
                        {...field}
                        onChange={(evt) => {
                          field.onChange(evt);
                          calculateExpenses();
                        }}
                        onMouseWheel={() => {
                          calculateExpenses();
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
                    <ReactSelect<GroupMember, true>
                      instanceId='participants'
                      isMulti
                      id='expense-participants'
                      useBasicStyles
                      chakraStyles={{
                        control(base) {
                          return { ...base, backgroundColor: 'white' };
                        },
                        menuList(base) {
                          return { ...base, paddingY: 0 };
                        },
                      }}
                      options={participantOptions}
                      getOptionLabel={(option: GroupMember) =>
                        option.name || ''
                      }
                      getOptionValue={(option: GroupMember) => option._id}
                      {...field}
                      onChange={(values) => {
                        const totalAmount = formMethods.watch('amount');
                        if (Array.isArray(values)) {
                          field.onChange(values);
                          // const updatedParticipants = values.map(
                          //   (participant) => {
                          //     let expense = 0;
                          //     if (splitType === 'Equal Split') {
                          //       expense = totalAmount / values.length;
                          //     }
                          //     return { ...participant, expense };
                          //   }
                          // );
                          // formMethods.reset({
                          //   participants: updatedParticipants,
                          //   amount: totalAmount,
                          // });
                          calculateExpenses({ participants: values });
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
            <SplitTypeSelector
              currentSplitType={splitType}
              onChangeSplitType={onChangeSplitType}
            />
            <ExpenseValues splitType={splitType} />
          </Flex>
        </HStack>
        <Spacer />
        <SubmitButton colorScheme='green'>Add Expense</SubmitButton>
      </VStack>
    </FormProvider>
  );
}
