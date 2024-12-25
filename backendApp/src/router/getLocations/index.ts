import _ from 'lodash'
import { locations } from '../../lib/locations'
import { trpc } from '../../lib/trpc'

export const getLocationsTrpcRoute = trpc.procedure.query(() => {
  return { locations: locations.map((location) => _.pick(location, ['id', 'name', 'description'])) }
})
