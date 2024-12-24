import { Link, Outlet } from 'react-router-dom'
import { getAllLocationsRoute, getNewGoodsRoute } from '../../lib/routes'
import css from './index.module.scss'

export const Layout = () => {
  return (
    <div className={css.layout}>
      <div className={css.navigation}>
        <div className={css.logo}>Меню</div>
        <ul className={css.menu}>
          <li className={css.item}>
            <Link className={css.link} to={getAllLocationsRoute()}>
              Все участки
            </Link>
          </li>
          <li className={css.item}>
            <Link className={css.link} to={getNewGoodsRoute()}>
              Добавить товар
            </Link>
          </li>
        </ul>
      </div>
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  )
}
