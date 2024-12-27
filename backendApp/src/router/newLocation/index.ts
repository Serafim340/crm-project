import { z } from 'zod'
import { locations } from '../../lib/locations'
import { trpc } from '../../lib/trpc'

export const newLocationTrpcRoute = trpc.procedure
  .input(
    z.object({
      id: z.string().min(1),
      name: z.string().min(1),
      location: z
        .string()
        .min(1)
        .regex(/^[a-z0-9-]+$/, 'Участок может содержать только строчные буквы, цифры и дефисы'),
      description: z.string().min(1),
      text: z.string().min(100),
    })
  )
  .mutation(({ input }) => {
    locations.unshift(input)
    return true
  })
