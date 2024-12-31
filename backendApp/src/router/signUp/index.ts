import crypto from 'crypto'
import { trpc } from '../../lib/trpc'
import { zSignUpTrpcInput } from './input'

export const signUpTrpcRoute = trpc.procedure.input(zSignUpTrpcInput).mutation(async ({ ctx, input }) => {
  const exUser = await ctx.prisma.user.findUnique({
    where: {
      login: input.login,
    },
  })
  if (exUser) {
    throw new Error('User with this nick already exists')
  }
  await ctx.prisma.user.create({
    data: {
      login: input.login,
      name: input.name,
      surname: input.surname,
      password: crypto.createHash('sha256').update(input.password).digest('hex'),
    },
  })
  return true
})
