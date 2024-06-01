import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from '@chakra-ui/react';
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

type FormFieldProps = {
  label: string;
  name: string;
  controller?: Control<FieldValues, any>;
} & InputProps;

export function FormField({
  id,
  type = 'text',
  label,
  name,
  controller,
  ...props
}: FormFieldProps) {
  const formContext = useFormContext();

  const FieldComponent = (control: Control<FieldValues, any>) => {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => {
          const isError = fieldState.isDirty && !!fieldState.error;
          return (
            <FormControl isInvalid={isError}>
              <FormLabel>{label}</FormLabel>
              <Input id={id} type={type} {...props} {...field} />
              {isError && (
                <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
              )}
            </FormControl>
          );
        }}
      />
    );
  };

  if (controller) {
    return FieldComponent(controller);
  } else if (formContext) {
    return FieldComponent(formContext.control);
  } else {
    throw new Error(
      `Can not initialize form field ${name} due to lack of control props`
    );
  }
}

type FormField2Props<
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

export function FormField2<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, control, children }: FormField2Props<TFieldValues, TName>) {
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
