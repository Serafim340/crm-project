import { Link, Outlet } from 'react-router-dom'
import { getAllLocationsRoute } from '../../lib/routes'

export const Layout = () => {
  return (
    <div>
      <p>
        <b>Участок</b>
      </p>
      <ul>
        <li>
          <Link to={getAllLocationsRoute()}>Все участки</Link>
        </li>
      </ul>
      <hr />
      <div>
        <Outlet />
      </div>
    </div>
  )
}
