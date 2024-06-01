import { api } from '@/shared/api';
import { FormCallbackParams, processForm } from '@/shared/form';
import { FormState } from '@/types/form';
import { redirect } from 'next/navigation';
import { RegisterValidationSchema } from './formSchema';

export async function onRegister(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  return processForm(
    formData,
    RegisterValidationSchema,
    async ({ data, fields }: FormCallbackParams) => {
      const response = await api('/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response.success) {
        redirect('/login');
      }

      return {
        success: false,
        message: response.error.message,
        fields,
      };
    }
  );
}
