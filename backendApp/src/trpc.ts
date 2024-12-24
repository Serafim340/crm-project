import { initTRPC } from '@trpc/server'
import _ from 'lodash'
import { z } from 'zod'

const locations = _.times(100, (i) => ({
  id: `location-${i}`,
  name: `Участок ${i}`,
  description: `Описание участка ${i}`,
  text: _.times(100, (j) => `<p>Текст участка ${j} предложения для участка ${i}</p>`).join(''),
}))

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getLocations: trpc.procedure.query(() => {
    return { locations: locations.map((location) => _.pick(location, ['id', 'name', 'description'])) }
  }),
  getLocation: trpc.procedure
    .input(
      z.object({
        locationId: z.string(),
      })
    )
    .query(({ input }) => {
      const location = locations.find((location) => location.id === input.locationId)
      return { location: location || null }
    }),
})

export type TrpcRouter = typeof trpcRouter
