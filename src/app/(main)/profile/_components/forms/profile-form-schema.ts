import { z } from "zod";
import { zodValidations } from '@/utils/zod-validations';

export const profileSchema = z.object({
  name: zodValidations.required("Full Name"),
  email: zodValidations.email(),
});
