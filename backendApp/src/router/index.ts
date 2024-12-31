import { trpc } from '../lib/trpc'
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { getLocationTrpcRoute } from './getLocation'
import { getLocationsTrpcRoute } from './getLocations'
import { newLocationTrpcRoute } from './newLocation'
import { signUpTrpcRoute } from './signUp'
// @endindex
export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  getLocation: getLocationTrpcRoute,
  getLocations: getLocationsTrpcRoute,
  newLocation: newLocationTrpcRoute,
  signUp: signUpTrpcRoute,
  // @endindex
})

export type TrpcRouter = typeof trpcRouter
