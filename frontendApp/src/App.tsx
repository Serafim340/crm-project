import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getAllLocationsRoute, getViewLocationRoute } from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { LocationsPage } from './pages/LocationsPage'
import { ViewLocationPage } from './pages/ViewLocationPage'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route path={getAllLocationsRoute()} element={<LocationsPage />} />
          <Route path={getViewLocationRoute({ locationId: ':locationId' })} element={<ViewLocationPage />} />
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
