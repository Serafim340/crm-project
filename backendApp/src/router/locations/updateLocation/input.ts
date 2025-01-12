import { z } from 'zod'
import { zNewLocationTrpcInput } from '../newLocation/input'

export const zUpdateLocationTrpcInput = zNewLocationTrpcInput.extend({
  locationId: z.string().min(1),
})
