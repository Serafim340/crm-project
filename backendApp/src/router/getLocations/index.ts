import { trpc } from '../../lib/trpc'

export const getLocationsTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const locations = await ctx.prisma.location.findMany({
    select: {
      id: true,
      name: true,
      address: true,
    },
    orderBy: {
      id: 'asc',
    },
  })
  return { locations }
})
