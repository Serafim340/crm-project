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
      include: {
        products: {
          where: {
            quantity: {
              gt: 0,
            },
          },
          include: {
            product: true,
          },
        },
      },
    })

    if (!location) {
      throw new Error('LOCATION_NOT_FOUND')
    }

    return { location }
  })
