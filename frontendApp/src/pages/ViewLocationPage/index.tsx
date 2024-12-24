import { useParams } from 'react-router-dom'

export const ViewLocationPage = () => {
  const { locationId } = useParams() as { locationId: string }
  return (
    <div>
      <h1>{locationId}</h1>
      <p>Описание участка №1</p>
      <div>
        <p>Наличие</p>
        <p>Доступность</p>
        <p>Стоимость</p>
      </div>
    </div>
  )
}
