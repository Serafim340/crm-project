import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import * as routes from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { EditLocationPage } from './pages/EditLocationPage'
import { LocationsPage } from './pages/LocationsPage'
import { NewLocationPage } from './pages/NewLocationPage'
import { NewProductPage } from './pages/NewProductPage'
import { SignInPage } from './pages/SignInPage'
import { SignOutPage } from './pages/SignOutPage'
import { SignUpPage } from './pages/SignUpPage'
import { ViewLocationPage } from './pages/ViewLocationPage'
import './styles/global.scss'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route path={routes.getSignOutRoute()} element={<SignOutPage />} />
          <Route element={<Layout />}>
            <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
            <Route path={routes.getSignInRoute()} element={<SignInPage />} />
            <Route path={routes.getAllLocationsRoute()} element={<LocationsPage />} />
            <Route path={routes.getViewLocationRoute(routes.viewLocationRouteParams)} element={<ViewLocationPage />} />
            <Route path={routes.getNewLocationRoute()} element={<NewLocationPage />} />
            <Route path={routes.getNewProductRoute()} element={<NewProductPage />} />
            <Route path={routes.getEditLocationRoute(routes.editLocationRouteParams)} element={<EditLocationPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
