import { locations } from '../../lib/locations'
import { trpc } from '../../lib/trpc'
import { zNewLocationTrpcInput } from './input'

export const newLocationTrpcRoute = trpc.procedure.input(zNewLocationTrpcInput).mutation(({ input }) => {
  locations.unshift(input)
  return true
})
