import { Link } from 'react-router-dom'
import { getViewLocationRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const LocationsPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getLocations.useQuery()
  if (isLoading || isFetching) {
    return <span>Загрузка...</span>
  }

  if (isError) {
    return <span>Ошибка: {error.message}</span>
  }

  return (
    <div>
      <h1 className={css.title}>Участки</h1>
      <div className={css.locations}>
        {data.locations.map((location) => (
          <div className={css.location} key={location.id}>
            <h2 className={css.locationName}>
              <Link className={css.locationLink} to={getViewLocationRoute({ locationId: location.id })}>
                {location.name}
              </Link>
            </h2>
            <p className={css.locationDescription}>{location.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
