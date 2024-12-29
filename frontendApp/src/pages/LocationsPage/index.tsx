import { Link } from 'react-router-dom'
import { Segment } from '../../components/Segment'
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
    <Segment title="Участки">
      <div className={css.locations}>
        {data.locations.map((location) => (
          <div className={css.location} key={location.name}>
            <Segment
              size={2}
              title={
                <Link className={css.locationLink} to={getViewLocationRoute({ locationId: location.id })}>
                  {location.name}
                </Link>
              }
              description={location.description}
            ></Segment>
          </div>
        ))}
      </div>
    </Segment>
  )
}
