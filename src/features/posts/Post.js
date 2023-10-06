import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectPostById } from './postsApiSlice'
import { selectUserById } from '../users/usersApiSlice'

const Post = ({ postId }) => {

  const post = useSelector(state => selectPostById(state, postId))
  const user = useSelector(state => selectUserById(state, post.userId))

  if (post) {
    const created = new Date(post.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
    const updated = new Date(post.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

    return (
      <article className="post">
        <Link to={`/dash/posts/${post.id}`}>
          <h2>{post.title}</h2>
          <p className="postDate">{created}</p>
          <p className="postDate">{updated}</p>
        </Link>
        <p>{user.userName}</p>
        <p className="postBody">{
          (post.body).length <= 25
            ? post.body
            : `${(post.body).slice(0, 25)}...`
        }</p>
      </article>
    )

  } else return null
}
export default Post