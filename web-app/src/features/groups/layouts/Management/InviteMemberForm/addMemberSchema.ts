import { z } from 'zod';

const AddMemberFormValidation = z.object({
  groupId: z.string().trim().optional(),
  senderId: z.string().trim().optional(),
  recipientQuery: z.string().trim().min(1, 'Recipient is required'),
});

export default AddMemberFormValidation;
