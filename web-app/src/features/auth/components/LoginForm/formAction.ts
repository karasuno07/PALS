'use server';

import { TOKEN_COOKIE_SECRET } from '@/constants';
import { AuthResponse } from '@/models/Auth';
import { api } from '@/shared/api';
import { FormCallbackParams, processForm } from '@/shared/form';
import { FormState } from '@/types/form';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LoginValidationSchema } from './formSchema';

export async function onLogin(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  return processForm(
    formData,
    LoginValidationSchema,
    async ({ data, fields }: FormCallbackParams) => {
      const response = await api<AuthResponse>('/authenticate', {
        method: 'POST',
        body: JSON.stringify(data),
        skipAuth: true,
      });
      if (response.success) {
        const { token } = response.data;
        cookies().set(TOKEN_COOKIE_SECRET, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24,
        });
        redirect('/');
      }

      return {
        success: false,
        message: response.error.message,
        fields,
      };
    }
  );
}
