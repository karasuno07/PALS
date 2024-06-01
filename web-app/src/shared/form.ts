import { FormState } from '@/types/form';
import { z } from 'zod';

export type FormCallbackParams = {
  fields: Record<string, string>;
  data?: {
    [x: string]: any;
  };
};

export async function processForm(
  data: FormData,
  validationSchema: z.AnyZodObject,
  callback: ({ data, fields }: FormCallbackParams) => Promise<FormState>
): Promise<FormState> {
  const formData = Object.fromEntries(data);

  const parsed = validationSchema.safeParse(formData);
  const fields: Record<string, string> = {};
  for (const key of Object.keys(formData)) {
    fields[key] = formData[key].toString();
  }

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid form data',
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  } else {
    return callback({ data: parsed.data, fields });
  }
}
