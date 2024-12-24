import { TrpcProvider } from './lib/trpc'
import { LocationsPage } from './pages'

export const App = () => {
  return (
    <TrpcProvider>
      <LocationsPage />
    </TrpcProvider>
  )
}
