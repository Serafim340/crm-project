import { trpc } from '../../lib/trpc'
import { getPasswordHash } from '../../utils/getPasswordHash'
import { signJWT } from '../../utils/signJWT'
import { zSignInTrpcInput } from './input'

export const signInTrpcRoute = trpc.procedure.input(zSignInTrpcInput).mutation(async ({ ctx, input }) => {
  const user = await ctx.prisma.user.findFirst({
    where: {
      login: input.login,
      password: getPasswordHash(input.password),
    },
  })
  if (!user) {
    throw new Error('Неверный логин или пароль')
  }
  const token = signJWT(user.id)
  return { token }
})
