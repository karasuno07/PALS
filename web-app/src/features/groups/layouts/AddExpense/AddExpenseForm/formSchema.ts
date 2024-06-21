import { z } from 'zod';

export const AddExpenseFormValidationSchema = z.object({
  name: z.string().trim().min(1, 'Expense name is required'),
  date: z.date({ message: 'Expense date is required' }),
  amount: z.number().min(5000, 'Min value is 1k'),
});
