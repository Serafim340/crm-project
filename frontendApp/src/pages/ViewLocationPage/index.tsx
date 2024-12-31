import { useParams } from 'react-router-dom'
import { Segment } from '../../components/Segment'
import { type ViewIdeaRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const ViewLocationPage = () => {
  const { locationName } = useParams() as ViewIdeaRouteParams

  const { data, error, isLoading, isFetching, isError } = trpc.getLocation.useQuery({
    locationName,
  })

  if (isLoading || isFetching) {
    return <span>Загрузка..</span>
  }

  if (isError) {
    return <span>Ошибка: {error.message}</span>
  }

  if (!data.location) {
    return <span>Участок не найден</span>
  }

  return (
    <Segment title={data.location.name} address={data.location.address}>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: data.location.text }} />
    </Segment>
  )
}
