import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { BiChevronRight } from 'react-icons/bi';

type Props = {
  currentTab: string;
};

export default function TabNagivation({ currentTab }: Props) {
  return (
    <Breadcrumb
      fontWeight='bold'
      separator={<BiChevronRight color='gray.500' />}
      marginBottom={5}
    >
      <BreadcrumbItem>
        <BreadcrumbLink href='/'>Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage pointerEvents='none'>
        <BreadcrumbLink href='#'>{currentTab}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
