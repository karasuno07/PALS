import { Props, Select } from 'chakra-react-select';

export default function MultiSelect({
  id,
  isMulti = true,
  options,
  chakraStyles,
  ...props
}: Props) {
  return (
    <Select
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
}
