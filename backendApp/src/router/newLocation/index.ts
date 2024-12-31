import { trpc } from '../../lib/trpc'
import { zNewLocationTrpcInput } from './input'

export const newLocationTrpcRoute = trpc.procedure.input(zNewLocationTrpcInput).mutation(async ({ input, ctx }) => {
  const exLocation = await ctx.prisma.location.findUnique({
    where: {
      name: input.name,
    },
  })
  if (exLocation) {
    throw Error('Участок с таким номером уже существует')
  }
  await ctx.prisma.location.create({
    data: input,
  })
  return true
})
