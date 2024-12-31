import { z } from 'zod'
import { locations } from '../../lib/locations'
import { trpc } from '../../lib/trpc'

export const getLocationTrpcRoute = trpc.procedure
  .input(
    z.object({
      locationName: z.string(),
    })
  )
  .query(({ input }) => {
    const location = locations.find((location) => location.name === input.locationName)
    return { location: location || null }
  })
