import { z } from 'zod'
import { trpc } from '../../../lib/trpc'

export const getLocationTrpcRoute = trpc.procedure
  .input(
    z.object({
      locationName: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const location = await ctx.prisma.location.findUnique({
      where: {
        name: input.locationName,
      },
    })
    return { location }
  })
