import { z } from 'zod';

export const CreatePersonValidator = z.object({
  documentNumber: z.string().min(1, 'Document number is required'),
  documentTypeId: z.number().int().positive('Document type ID must be positive'),
  firstName: z.string().min(1, 'First name is required'),
  firstSurname: z.string().min(1, 'First surname is required')
});

export type TCreatePersonValidator = z.infer<typeof CreatePersonValidator>;
