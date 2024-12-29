import { locations } from '../../lib/locations'
import { trpc } from '../../lib/trpc'
import { zNewLocationTrpcInput } from './input'

export const newLocationTrpcRoute = trpc.procedure.input(zNewLocationTrpcInput).mutation(({ input }) => {
  if (locations.find((location) => location.name === input.name)) {
    throw Error('Участок с таким номером уже существует')
  }
  locations.unshift(input)
  return true
})
