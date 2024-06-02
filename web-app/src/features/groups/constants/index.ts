type Tab = {
  id: number;
  name: string;
  visibility: boolean;
};

export const TABS: Tab[] = [
  {
    id: 1,
    name: 'Greetings',
    visibility: false,
  },
  { id: 2, name: 'Dashboard', visibility: true },
  { id: 3, name: 'Balances', visibility: true },
  { id: 4, name: 'Add Expense', visibility: true },
  { id: 5, name: 'Expenses History', visibility: true },
];

export const SPLIT_TYPES = [
  'Equal Split',
  'Unequal Split',
  'By Lend',
  'By Shares',
  'By Percentages',
] as const;
