import { z } from 'zod'

export const zSetProductCountTrpcInput = z.object({
  locationId: z.string().min(1),
  productId: z.string().min(1),
  operation: z.enum(['increment', 'decrement']),
  quantity: z.number(),
})
