import { trpc } from '../../../lib/trpc'
import { zGetLocationsTrpcInput } from './input'

export const getLocationsTrpcRoute = trpc.procedure.input(zGetLocationsTrpcInput).query(async ({ ctx, input }) => {
  const locations = await ctx.prisma.location.findMany({
    select: {
      id: true,
      name: true,
      address: true,
      serialNumber: true,
    },
    orderBy: [
      {
        name: 'asc',
      },
      {
        serialNumber: 'asc',
      },
    ],
    cursor: input.cursor ? { serialNumber: input.cursor } : undefined,
    take: input.limit,
  })
  const nextLocation = locations.at(input.limit)
  const nextCursor = nextLocation?.serialNumber
  const locationsExceptNext = locations.slice(0, input.limit)

  return { locations: locationsExceptNext, nextCursor }
})
