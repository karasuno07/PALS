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
  { id: 6, name: 'Group Management', visibility: true },
];

export type SplitType = 'Equal Split' | 'Unequal Split' | 'By Lend';
export const SPLIT_TYPES = ['Equal Split', 'Unequal Split', 'By Lend'] as const;

export type ExpenseCategory = {
  title: string;
  categories: string[];
};

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  {
    title: 'Entertainment',
    categories: ['Games', 'Movies', 'Music', 'Sports'],
  },
  { title: 'Food and drink', categories: ['Groceries', 'Dine out', 'Liquor'] },
  {
    title: 'Home',
    categories: [
      'Rent',
      'Mortgage',
      'Household supplies',
      'Furniture',
      'Maintenance',
      'Pets',
      'Services',
      'Electronics',
    ],
  },
  {
    title: 'Transportation',
    categories: [
      'Parking',
      'Car',
      'Bus/train',
      'Gas/fuel',
      'Taxi',
      'Bicycle',
      'Hotel',
      'Rental Vehicle',
    ],
  },
  {
    title: 'Utilities',
    categories: [
      'Electricity',
      'Heat/gas',
      'Water',
      'TV/Phone/Internet',
      'Trash',
      'Cleaning',
    ],
  },
  { title: 'Uncategorized', categories: ['Other'] },
];