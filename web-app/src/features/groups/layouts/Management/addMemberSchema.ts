import { z } from 'zod';

const AddMemberFormValidation = z.object({
  groupId: z.string().trim().optional(),
  invitationQuery: z.string().trim().min(1, 'Search query is required'),
});

export default AddMemberFormValidation;
