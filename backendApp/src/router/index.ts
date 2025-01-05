import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'
import { trpc } from '../lib/trpc'
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { getLocationTrpcRoute } from './getLocation'
import { getLocationsTrpcRoute } from './getLocations'
import { getMeTrpcRoute } from './getMe'
import { newLocationTrpcRoute } from './newLocation'
import { newProductTrpcRoute } from './newProduct'
import { signInTrpcRoute } from './signIn'
import { signUpTrpcRoute } from './signUp'
import { updateLocationTrpcRoute } from './updateLocation'
// @endindex
export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  getLocation: getLocationTrpcRoute,
  getLocations: getLocationsTrpcRoute,
  getMe: getMeTrpcRoute,
  newLocation: newLocationTrpcRoute,
  newProduct: newProductTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  updateLocation: updateLocationTrpcRoute,
  // @endindex
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
