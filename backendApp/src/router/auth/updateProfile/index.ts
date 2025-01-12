import { toClientMe } from '../../../lib/models'
import { trpc } from '../../../lib/trpc'
import { zUpdateProfileTrpcInput } from './input'

export const updateProfileTrpcRoute = trpc.procedure.input(zUpdateProfileTrpcInput).mutation(async ({ ctx, input }) => {
  if (!ctx.me) {
    throw new Error('UNAUTHORIZED')
  }
  if (ctx.me.login !== input.login) {
    const exUser = await ctx.prisma.user.findUnique({
      where: {
        login: input.login,
      },
    })
    if (exUser) {
      throw new Error('User with this nick already exists')
    }
  }
  const updatedMe = await ctx.prisma.user.update({
    where: {
      id: ctx.me.id,
    },
    data: input,
  })
  ctx.me = updatedMe
  return toClientMe(updatedMe)
})
