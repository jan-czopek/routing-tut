// import { useStoreState } from 'easy-peasy'
import { useNavigate, useLocation } from 'react-router-dom'

const DashFooter = () => {
  const today = new Date();
  // const postCount = useStoreState((state) => state.postCount);

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const onGoHomeClicked = () => navigate('/dash')

  let goHomeButton = null
  if (pathname !== '/dash') {
    goHomeButton = (
      <button
        title="Home"
        onClick={onGoHomeClicked}
      >
        Home
      </button>
    )
  }

  const content = (
    <footer className="Footer">
      {goHomeButton}
      <p>Copyright &copy; {today.getFullYear()}</p>
      {/* <p>{postCount} Blog pages</p> */}
    </footer>
  )
  return (
    content
  )
}

export default DashFooter