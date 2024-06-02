'use client';

import { Button, ButtonProps } from '@chakra-ui/react';
import { useFormStatus } from 'react-dom';

export default function SubmitButton({
  isLoading,
  isDisabled,
  loadingText = 'Loading',
  colorScheme = 'red',
  children,
  ...props
}: Omit<ButtonProps, 'type'>) {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      isLoading={isLoading || pending}
      loadingText={loadingText}
      isDisabled={isDisabled || pending}
      colorScheme={colorScheme}
      {...props}
    >
      {children}
    </Button>
  );
}
