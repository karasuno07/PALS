'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

function Providers({children}: PropsWithChildren) {
  return (
    <ChakraProvider>{children}</ChakraProvider>
  )
}

export default Providers