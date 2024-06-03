'use client';

import { Button, Stack } from '@chakra-ui/react';
import { FaFacebook, FaGithub } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';

export default function OAuth2SignIn() {
  const onOAuthSignInHandler = () => {
    console.log('Function currently not available!');
  };

  return (
    <Stack direction='column' gap={4}>
      <Button
        colorScheme='blue'
        leftIcon={<FaFacebook size={24} />}
        iconSpacing={5}
        onClick={onOAuthSignInHandler}
      >
        Sign in with Facebook
      </Button>
      <Button
        leftIcon={<FaGithub size={24} />}
        iconSpacing={5}
        bgColor='#000'
        _hover={{
          bgColor: '#444',
        }}
        colorScheme='blackAlpha'
        onClick={onOAuthSignInHandler}
      >
        Sign in with Github
      </Button>
      <Button
        leftIcon={<FcGoogle size={24} />}
        iconSpacing={5}
        onClick={onOAuthSignInHandler}
      >
        Sign in with Google
      </Button>
    </Stack>
  );
}
