import { z } from 'zod'

export const zNewProductTrpcInput = z.object({
  name: z.string().min(1),
})
