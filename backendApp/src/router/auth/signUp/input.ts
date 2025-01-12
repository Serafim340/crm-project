import { z } from 'zod'

export const zSignUpTrpcInput = z.object({
  login: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/, 'Nick may contain only lowercase letters, numbers and dashes'),
  password: z.string().min(1),
  name: z.string().max(50).default(''),
  surname: z.string().min(1),
})
