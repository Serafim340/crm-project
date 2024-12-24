import { useParams } from 'react-router-dom'
import { type ViewIdeaRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const ViewLocationPage = () => {
  const { locationId } = useParams() as ViewIdeaRouteParams

  const { data, error, isLoading, isFetching, isError } = trpc.getLocation.useQuery({
    locationId,
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
    <div>
      <h1 className={css.title}>{data.location.name}</h1>
      <p className={css.description}>{data.location.description}</p>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: data.location.text }} />
    </div>
  )
}
