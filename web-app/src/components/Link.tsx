'use client';

import { chakra } from '@chakra-ui/react';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';

const Link = chakra<typeof NextLink, NextLinkProps>(NextLink, {
  shouldForwardProp: (prop) => ['href', 'target', 'children'].includes(prop),
});

export default Link;
