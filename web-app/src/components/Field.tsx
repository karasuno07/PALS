'use client';

import {
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as NumberInputContainer,
  NumberInputField,
  NumberInputFieldProps,
  NumberInputStepper,
  forwardRef,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseFormStateReturn,
  useFormContext,
} from 'react-hook-form';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & {
  children: ({
    field,
    fieldState,
    formState,
  }: {
    field: ControllerRenderProps<TFieldValues, TName>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<TFieldValues>;
  }) => React.ReactElement;
};

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, control, children }: FormFieldProps<TFieldValues, TName>) {
  const formContext = useFormContext<TFieldValues>();

  const FieldComponent = (control: Control<TFieldValues>) => {
    return <Controller control={control} name={name} render={children} />;
  };

  if (control) {
    return FieldComponent(control);
  } else if (formContext) {
    return FieldComponent(formContext.control);
  } else {
    throw new Error(
      `Can not initialize form field ${name} due to lack of control props`
    );
  }
}

export const PasswordInput = forwardRef<Omit<InputProps, 'type'>, 'input'>(
  function PasswordInput(props, ref) {
    const [show, toggleShow] = useState<boolean>(false);

    const ToggleIcon = show ? MdVisibilityOff : MdVisibility;

    const onToggleShowHandler = () => toggleShow((prev) => !prev);

    return (
      <InputGroup>
        <Input ref={ref} type={show ? 'text' : 'password'} {...props} />
        <InputRightElement cursor='pointer'>
          <ToggleIcon size={16} onClick={onToggleShowHandler} />
        </InputRightElement>
      </InputGroup>
    );
  }
);

type NumericInputProps = Omit<
  NumberInputFieldProps,
  'type' | 'min' | 'step' | 'defaultValue'
> & {
  min?: number;
  step?: number;
  defaultValue?: number;
  currency: string;
  onMouseWheel?: (valueAsString: string, valueAsNumber: number) => void;
};

export const NumericInput = forwardRef<NumericInputProps, 'input'>(
  function NumericInput(
    { min, step, currency, defaultValue = 0, onMouseWheel, ...props },
    ref
  ) {
    const formContext = useFormContext();
    return (
      <NumberInputContainer
        allowMouseWheel
        min={min}
        step={step}
        value={(props.value as string) || 0}
        onChange={(valueString, valueNumber) => {
          if (formContext && props.name) {
            formContext.setValue(props.name, valueString);
          }
          if (onMouseWheel) {
            onMouseWheel(valueString, valueNumber);
          }
        }}
      >
        <NumberInputField ref={ref} {...props} />
        {!props.readOnly && (
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        )}
      </NumberInputContainer>
    );
  }
);

