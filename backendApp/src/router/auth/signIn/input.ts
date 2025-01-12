import { z } from 'zod'

export const zSignInTrpcInput = z.object({
  login: z.string().min(1),
  password: z.string().min(1),
})
