import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';
import useWindowSize from '../hooks/useWindowSize';

import { useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'

const DASH_REGEX = /^\/dash(\/)?$/
const POSTS_REGEX = /^\/dash\/posts(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = ({ title }) => {
  const { width } = useWindowSize();

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

  if (isLoading) return <p>Logging Out...</p>

  if (isError) return <p>Error: {error.data?.message}</p>

  let dashClass = null
  if (!DASH_REGEX.test(pathname) && !POSTS_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
    dashClass = "dash-header__container--small"
  }

  const logoutButton = (
    <button
      className="icon-button"
      title="Logout"
      onClick={sendLogout}
    >
      Logout
    </button>
  )

  return (
    <header className="Header">
      <Link to="/dash">
        <h1 className="dash-header__title">main</h1>
      </Link>
      <h1>{title}</h1>
      {width < 768 ? <FaMobileAlt />
        : width < 922 ? <FaTabletAlt />
          : <FaLaptop />}
      <nav className="Nav">
        {logoutButton}
      </nav>
    </header>
  )
}

export default DashHeader
