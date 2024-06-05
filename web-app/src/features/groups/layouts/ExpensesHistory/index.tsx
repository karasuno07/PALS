import TabContentLayout from '@/features/groups/layouts/TabContentLayout';
import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

export default function ExpensesHistory() {
  return (
    <TabContentLayout tabIndex={4} tabName='Expenses History'>
      <Table variant='simple' backgroundColor='white'>
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>Expense Date</Th>
            <Th>Expense Name</Th>
            <Th>Payer Name</Th>
            <Th isNumeric>Amount Paid</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>20/05/2024</Td>
            <Td>Games</Td>
            <Td>Killua</Td>
            <Td isNumeric>25.4</Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td>20/05/2024</Td>
            <Td>House</Td>
            <Td>Killua</Td>
            <Td isNumeric>25.4</Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td>20/05/2024</Td>
            <Td>Movies</Td>
            <Td>Killua</Td>
            <Td isNumeric>25.4</Td>
            <Td></Td>
          </Tr>
        </Tbody>
      </Table>
    </TabContentLayout>
  );
}
