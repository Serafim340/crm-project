import { trpc } from '../../lib/trpc'
import { zUpdateLocationTrpcInput } from './input'

export const updateLocationTrpcRoute = trpc.procedure
  .input(zUpdateLocationTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const { locationId, ...locationInput } = input
    if (!ctx.me) {
      throw new Error('UNAUTHORIZED')
    }
    const location = await ctx.prisma.location.findUnique({
      where: {
        id: locationId,
      },
    })
    if (!location) {
      throw new Error('NOT_FOUND')
    }
    if (location.name !== input.name) {
      const exLocation = await ctx.prisma.location.findUnique({
        where: {
          name: input.name,
        },
      })
      if (exLocation) {
        throw new Error('Участок с таким названием уже существует')
      }
    }
    await ctx.prisma.location.update({
      where: {
        id: locationId,
      },
      data: {
        ...locationInput,
      },
    })
    return true
  })
