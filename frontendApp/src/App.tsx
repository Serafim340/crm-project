import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { getAllLocationsRoute, getViewLocationRoute, viewLocationRouteParams } from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { LocationsPage } from './pages/LocationsPage'
import { ViewLocationPage } from './pages/ViewLocationPage'
import './styles/global.scss'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={getAllLocationsRoute()} element={<LocationsPage />} />
            <Route path={getViewLocationRoute(viewLocationRouteParams)} element={<ViewLocationPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
