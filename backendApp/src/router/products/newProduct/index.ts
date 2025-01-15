import { trpc } from '../../../lib/trpc'
import { zNewProductTrpcInput } from './input'

export const newProductTrpcRoute = trpc.procedure.input(zNewProductTrpcInput).mutation(async ({ input, ctx }) => {
  const exProduct = await ctx.prisma.product.findUnique({
    where: {
      name: input.name,
    },
  })
  if (exProduct) {
    throw Error('Товар с таким названием уже существует')
  }
  await ctx.prisma.product.create({
    data: input,
  })
  return true
})
