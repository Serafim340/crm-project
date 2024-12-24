import { initTRPC } from '@trpc/server'

const locations = [
  { id: 'first', name: 'Участок 1', description: 'Описание участка 1' },
  { id: 'second', name: 'Участок 2', description: 'Описание участка 2' },
]
const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getLocations: trpc.procedure.query(() => {
    return { locations }
  }),
})

export type TrpcRouter = typeof trpcRouter
