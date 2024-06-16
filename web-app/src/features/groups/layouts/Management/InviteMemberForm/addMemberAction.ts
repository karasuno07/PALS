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
      const response = await api(`/invitations/invite/${data!.groupId}`, {
        method: 'POST',
        body: JSON.stringify({
          senderId: data!.senderId,
          recipientQuery: data!.recipientQuery,
        }),
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
        fields,
      };
    }
  );
}
