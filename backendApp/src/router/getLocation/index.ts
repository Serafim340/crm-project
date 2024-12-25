import { z } from 'zod'
import { locations } from '../../lib/locations'
import { trpc } from '../../lib/trpc'

export const getLocationTrpcRoute = trpc.procedure
  .input(
    z.object({
      locationId: z.string(),
    })
  )
  .query(({ input }) => {
    const location = locations.find((location) => location.id === input.locationId)
    return { location: location || null }
  })
