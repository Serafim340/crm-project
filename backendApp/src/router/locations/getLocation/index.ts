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
    })
    if (!location) {
      throw new Error('LOCATION_NOT_FOUND')
    }
    const locationProducts = await ctx.prisma.locationProduct.findMany({
      where: {
        locationId: location.id,
      },
      include: {
        product: true,
      },
    })
    const productsQuantity = locationProducts.map((pcs) => ({
      productId: pcs.productId,
      productName: pcs.product.name,
      quantity: pcs.quantity,
    }))

    return { location, products: productsQuantity }
  })
