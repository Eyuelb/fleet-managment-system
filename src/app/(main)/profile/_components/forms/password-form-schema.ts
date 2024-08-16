import { zodValidations } from '@/utils/zod-validations';
import { z } from 'zod';

export const passwordSchema = z.object({
  oldPassword: z.string().min(6,{message: " Invalid password must be greater than 6"}),
  newPassword: zodValidations.password(),
  confirmPassword: zodValidations.confirmPassword(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});
