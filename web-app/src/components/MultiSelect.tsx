import { forwardRef } from '@chakra-ui/react';
import { Props, Select } from 'chakra-react-select';

const MultiSelect = forwardRef<Props, 'select'>(function MultiSelect(
  { id, isMulti = true, options, chakraStyles, ...props },
  ref
) {
  return (
    <Select
      ref={ref}
      instanceId={id}
      id={id ? String(id) : undefined}
      isMulti={isMulti}
      useBasicStyles
      chakraStyles={{
        control(base, state) {
          return { ...base, backgroundColor: 'white' };
        },
        option(base, state) {
          return { ...base };
        },
        menuList(base, state) {
          return { ...base, paddingY: 0 };
        },

        ...chakraStyles,
      }}
      options={options}
      {...props}
    />
  );
});

export default MultiSelect;
