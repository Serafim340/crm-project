const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}

export const getAllLocationsRoute = () => '/'
export const viewLocationRouteParams = getRouteParams({ locationId: true })
export type ViewIdeaRouteParams = typeof viewLocationRouteParams
export const getViewLocationRoute = ({ locationId }: ViewIdeaRouteParams) => `/locations/${locationId}`
export const getSalePageRoute = () => '/salePage'
