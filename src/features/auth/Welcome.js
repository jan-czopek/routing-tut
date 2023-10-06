import { Link } from 'react-router-dom'

const Welcome = () => {

  const date = new Date()
  const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

  const content = (
    <>
      <p>{today}</p>

      <h1>Welcome!</h1>

      <p><Link to="/dash/posts">View posts</Link></p>

      <p><Link to="/dash/posts/new">Add new posts</Link></p>

      <p><Link to="/dash/users">View User Settings</Link></p>

      <p><Link to="/dash/users/new">Add new user</Link></p>
    </>
  )

  return content
}
export default Welcome