import { Link } from "react-router-dom";
import { format, parseISO } from 'date-fns';

const Post = ({ post }) => {
  return (
    <article className="post">
      <Link to={`/post/${post.id}`}>
        <h2>{post.title}</h2>
        <p className="postDate">{format(parseISO(post.createdAt), 'dd/MM/yyyy HH:mm:ss')}</p>
      </Link>
      <p className="postBody">{
        (post.body).length <= 25
          ? post.body
          : `${(post.body).slice(0, 25)}...`
      }</p>
    </article>
  )
}

export default Post