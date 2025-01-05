import { format } from 'date-fns/format'
import { useParams } from 'react-router-dom'
import { LinkButton } from '../../components/Button'
import { Segment } from '../../components/Segment'
import { getEditLocationRoute, type ViewLocationRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const ViewLocationPage = () => {
  const { locationName } = useParams() as ViewLocationRouteParams

  const getLocationResult = trpc.getLocation.useQuery({
    locationName,
  })
  const getMeResult = trpc.getMe.useQuery()

  if (getLocationResult.isLoading || getLocationResult.isFetching || getMeResult.isLoading || getMeResult.isFetching) {
    return <span>Загрузка...</span>
  }

  if (getLocationResult.isError) {
    return <span>Ошибка: {getLocationResult.error.message}</span>
  }

  if (getMeResult.isError) {
    return <span>Ошибка: {getMeResult.error.message}</span>
  }

  if (!getLocationResult.data.location) {
    return <span>Участок не найден</span>
  }

  const location = getLocationResult.data.location
  // const me = getMeResult.data.me

  return (
    <Segment title={location.name} address={location.address}>
      <div className={css.createdAt}>Создан: {format(location.createdAt, 'yyyy-MM-dd')}</div>
      <div className={css.editButton}>
        <LinkButton to={getEditLocationRoute({ locationName: location.name })}>Edit Idea</LinkButton>
      </div>
    </Segment>
  )
}
