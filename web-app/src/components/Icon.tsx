import { Box, BoxProps, Text, TextProps } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { IconBaseProps, IconType } from 'react-icons';

interface IconProps {
  icon: IconType;
  iconProps?: Omit<IconBaseProps, 'onClick'>;
  text?: string;
  textProps?: TextProps;
  containerProps?: Omit<BoxProps, 'display'>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Icon = forwardRef<HTMLDivElement, IconProps>(function Icon(
  { icon, iconProps, text, textProps, containerProps, onClick },
  ref
) {
  const IconElement = icon;

  if (text) {
    return (
      <Box
        ref={ref}
        onClick={onClick}
        display='flex'
        alignItems='center'
        paddingX={2}
        gap={1}
        minWidth='80px'
        {...containerProps}
      >
        <IconElement {...iconProps} />
        <Text as='span' {...textProps}>
          {text}
        </Text>
      </Box>
    );
  }
  return (
    <Box as='span' ref={ref} className={'react-icons'} onClick={onClick}>
      <IconElement {...iconProps} />
    </Box>
  );
});

export default Icon;
