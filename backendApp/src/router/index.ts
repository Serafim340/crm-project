import { trpc } from '../lib/trpc'
import { getLocationTrpcRoute } from './getLocation'
import { getLocationsTrpcRoute } from './getLocations'

export const trpcRouter = trpc.router({
  getLocation: getLocationTrpcRoute,
  getLocations: getLocationsTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
