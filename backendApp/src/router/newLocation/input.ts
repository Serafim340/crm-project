import { z } from 'zod'

export const zNewLocationTrpcInput = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  location: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Участок может содержать только строчные буквы, цифры и дефисы'),
  description: z.string().min(1),
  text: z.string().min(100),
})
