import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AppContextProvider } from './lib/ctx'
import * as routes from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { NewProductPage } from './pages/NewProductPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { EditProfilePage } from './pages/auth/EditProfilePage'
import { SignInPage } from './pages/auth/SignInPage'
import { SignOutPage } from './pages/auth/SignOutPage'
import { SignUpPage } from './pages/auth/SignUpPage'
import { EditLocationPage } from './pages/locations/EditLocationPage'
import { LocationsPage } from './pages/locations/LocationsPage'
import { NewLocationPage } from './pages/locations/NewLocationPage'
import { ViewLocationPage } from './pages/locations/ViewLocationPage'
import './styles/global.scss'

export const App = () => {
  return (
    <TrpcProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.getSignOutRoute()} element={<SignOutPage />} />
            <Route element={<Layout />}>
              <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
              <Route path={routes.getSignInRoute()} element={<SignInPage />} />
              <Route path={routes.getEditProfileRoute()} element={<EditProfilePage />} />
              <Route path={routes.getAllLocationsRoute()} element={<LocationsPage />} />
              <Route
                path={routes.getViewLocationRoute(routes.viewLocationRouteParams)}
                element={<ViewLocationPage />}
              />
              <Route path={routes.getNewLocationRoute()} element={<NewLocationPage />} />
              <Route path={routes.getNewProductRoute()} element={<NewProductPage />} />
              <Route
                path={routes.getEditLocationRoute(routes.editLocationRouteParams)}
                element={<EditLocationPage />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  )
}
