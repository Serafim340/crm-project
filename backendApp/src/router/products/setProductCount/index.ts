import { trpc } from '../../../lib/trpc'
import { zSetProductCountTrpcInput } from './input'

export const setProductCountTrpcRoute = trpc.procedure
  .input(zSetProductCountTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const { locationId, productId, operation, quantity } = input
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
    const product = await ctx.prisma.product.findUnique({
      where: { id: productId },
    })
    if (!product) {
      throw new Error('PRODUCT_NOT_FOUND')
    }

    const locationProduct = await ctx.prisma.locationProduct.findUnique({
      where: {
        locationId_productId: {
          locationId,
          productId,
        },
      },
    })

    let newProductQuantity = locationProduct ? locationProduct.quantity : 0

    if (operation === 'increment') {
      newProductQuantity += quantity
    } else if (operation === 'decrement') {
      newProductQuantity = Math.max(0, newProductQuantity - quantity)
    } else {
      throw new Error('INVALID_OPERATION')
    }

    if (locationProduct) {
      await ctx.prisma.locationProduct.update({
        where: {
          id: locationProduct.id,
        },
        data: {
          quantity: newProductQuantity,
        },
      })
    } else {
      await ctx.prisma.locationProduct.create({
        data: {
          locationId,
          productId,
          quantity: newProductQuantity,
        },
      })
    }

    return {
      locationId,
      productId,
      quantity: newProductQuantity,
    }
  })
