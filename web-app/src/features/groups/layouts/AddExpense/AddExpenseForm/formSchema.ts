import { addDays, compareAsc, format } from 'date-fns';
import { z } from 'zod';

const DATE_FORMAT = 'yyyy-MM-dd';

export const AddExpenseFormValidationSchema = z
  .object({
    name: z.string().trim().min(1, 'Expense name is required'),
    date: z.string().trim().date('Expense date is required'),
    category: z.object(
      {
        value: z.string().trim().min(1, 'Expense category is required'),
      },
      { invalid_type_error: 'Expense category is required' }
    ),
    payer: z.string().trim().min(1, 'Payer is required'),
    amount: z
      .string()
      .trim()
      .min(4, 'Expense amount must contain at least 4 unit number'),
    participants: z
      .object({
        _id: z.string().trim().min(1, 'Participants is required'),
        name: z.string().trim(),
        expense: z
          .string()
          .trim()
          .min(3, 'Expense amount must contain at least 3 unit number'),
      })
      .array()
      .nonempty('Participants is required'),
    splitType: z.string().trim().min(1, 'Split type must be specified'),
  })
  .superRefine((data, ctx) => {
    function isValidDate() {
      if (!data.date) return false;

      const now = format(data.date, DATE_FORMAT);
      const min = format(addDays(new Date(), -30), DATE_FORMAT);
      const max = format(addDays(new Date(), 30), DATE_FORMAT);

      const isAfterMinDate = compareAsc(min, now) <= 0;
      const isBeforeMaxDate = compareAsc(max, max) >= 0;

      return isAfterMinDate && isBeforeMaxDate;
    }

    function isValidAmount() {
      return !Number.isNaN(data.amount) && Number(data.amount) >= 5000;
    }

    if (!isValidDate()) {
      ctx.addIssue({
        code: 'invalid_date',
        message:
          'Expense date must be within 30 days before or after the current date',
        path: ['date'],
      });
    }

    if (!isValidAmount()) {
      ctx.addIssue({
        code: 'too_small',
        minimum: 5000,
        type: 'string',
        inclusive: true,
        message: 'Expense amount must be numeric and at least 5k',
        path: ['amount'],
      });
    }
  });
