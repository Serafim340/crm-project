import { trpc } from '../lib/trpc'

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
      <h1>Участки</h1>
      {data.locations.map((location) => (
        <div key={location.id}>
          <h2>{location.name}</h2>
          <p>{location.description}</p>
        </div>
      ))}
    </div>
  )
}
