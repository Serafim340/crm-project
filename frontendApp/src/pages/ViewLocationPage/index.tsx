import { useParams } from 'react-router-dom'
import { type ViewIdeaRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

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
      <h1>{data.location.name}</h1>
      <p>{data.location.description}</p>
      <div dangerouslySetInnerHTML={{ __html: data.location.text }} />
    </div>
  )
}
