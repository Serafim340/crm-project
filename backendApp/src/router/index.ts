import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'
import { trpc } from '../lib/trpc'
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { getMeTrpcRoute } from './auth/getMe'
import { signInTrpcRoute } from './auth/signIn'
import { signUpTrpcRoute } from './auth/signUp'
import { getLocationTrpcRoute } from './locations/getLocation'
import { getLocationsTrpcRoute } from './locations/getLocations'
import { newLocationTrpcRoute } from './locations/newLocation'
import { updateLocationTrpcRoute } from './locations/updateLocation'
import { newProductTrpcRoute } from './newProduct'
// @endindex
export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  getMe: getMeTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  getLocation: getLocationTrpcRoute,
  getLocations: getLocationsTrpcRoute,
  newLocation: newLocationTrpcRoute,
  updateLocation: updateLocationTrpcRoute,
  newProduct: newProductTrpcRoute,
  // @endindex
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
