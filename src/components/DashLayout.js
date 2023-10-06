import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'

const DashLayout = () => {
  return (
    <div className="App">
      <DashHeader title={"Plan Eat"} />

      <main className="Home">
        <Outlet />
      </main>
      <DashFooter />
    </div>
  )
}
export default DashLayout