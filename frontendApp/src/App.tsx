import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import * as routes from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { LocationsPage } from './pages/LocationsPage'
import { NewGoodsPage } from './pages/NewGoodsPage'
import { ViewLocationPage } from './pages/ViewLocationPage'
import './styles/global.scss'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.getAllLocationsRoute()} element={<LocationsPage />} />
            <Route path={routes.getViewLocationRoute(routes.viewLocationRouteParams)} element={<ViewLocationPage />} />
            <Route path={routes.getNewGoodsRoute()} element={<NewGoodsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
