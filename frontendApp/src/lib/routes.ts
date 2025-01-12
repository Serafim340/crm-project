const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}

export const getAllLocationsRoute = () => '/'
export const viewLocationRouteParams = getRouteParams({ locationName: true })
export type ViewLocationRouteParams = typeof viewLocationRouteParams
export const getViewLocationRoute = ({ locationName }: ViewLocationRouteParams) => `/locations/${locationName}`
export const editLocationRouteParams = getRouteParams({ locationName: true })
export type EditLocationRouteParams = typeof viewLocationRouteParams
export const getEditLocationRoute = ({ locationName }: EditLocationRouteParams) => `/locations/${locationName}/edit`
export const getNewLocationRoute = () => '/new-location'
export const getNewProductRoute = () => '/new-product'
export const getEditProfileRoute = () => '/edit-profile'
export const getSignUpRoute = () => '/sign-up'
export const getSignInRoute = () => '/sign-in'
export const getSignOutRoute = () => '/sign-out'
