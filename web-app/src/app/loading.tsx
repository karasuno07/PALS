import { AbsoluteCenter, Spinner } from '@chakra-ui/react';

type Props = {};

export default function Loading({}: Props) {
  return (
    <AbsoluteCenter>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </AbsoluteCenter>
  );
}
