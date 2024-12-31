const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}

export const getAllLocationsRoute = () => '/'
export const viewLocationRouteParams = getRouteParams({ locationName: true })
export type ViewIdeaRouteParams = typeof viewLocationRouteParams
export const getViewLocationRoute = ({ locationName }: ViewIdeaRouteParams) => `/locations/${locationName}`
export const getNewLocationRoute = () => '/new-location'
export const getSignUpRoute = () => '/sign-up'
export const getSignInRoute = () => '/sign-in'
export const getSignOutRoute = () => '/sign-out'
