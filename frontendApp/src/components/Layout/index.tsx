import { createRef } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useMe } from '../../lib/ctx'
import {
  getAllLocationsRoute,
  getEditProfileRoute,
  getNewLocationRoute,
  getNewProductRoute,
  getSignInRoute,
  getSignOutRoute,
  getSignUpRoute,
} from '../../lib/routes'
import css from './index.module.scss'

export const layoutContentElRef = createRef<HTMLDivElement>()

export const Layout = () => {
  const me = useMe()
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
          {me ? (
            <>
              <li className={css.item}>
                <Link className={css.link} to={getNewLocationRoute()}>
                  Новый участок
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={getNewProductRoute()}>
                  Новый товар
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={getEditProfileRoute()}>
                  Редактировать профиль
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={getSignOutRoute()}>
                  Выйти ({me.login})
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={css.item}>
                <Link className={css.link} to={getSignUpRoute()}>
                  Регистрация
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={getSignInRoute()}>
                  Войти
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className={css.content} ref={layoutContentElRef}>
        <Outlet />
      </div>
    </div>
  )
}
