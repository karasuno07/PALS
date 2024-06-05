import { api } from '@/shared/api';
import { FormCallbackParams, processForm } from '@/shared/form';
import { FormState } from '@/types/form';
import AddMemberFormValidation from './addMemberSchema';

export async function addMemberAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  return processForm(
    formData,
    AddMemberFormValidation,
    async ({ data, fields }: FormCallbackParams) => {
      const response = await api(`/groups/${data!.groupId}/add-member`, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response.success) {
        return {
          success: true,
          message: 'Add member successfully',
        };
      }

      return {
        success: false,
        message: response.error.message,
      };
    }
  );
}
