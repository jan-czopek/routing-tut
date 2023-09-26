import { useParams, Link, useHistory } from "react-router-dom";
import { useStoreState, useStoreActions } from 'easy-peasy';

const PostPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const deletePost = useStoreActions((actions) => actions.deletePost);
  const getPostsById = useStoreState((state) => state.getPostsById);
  const post = getPostsById(id);

  const handleDelete = (id) => {
    deletePost(id);
    history.push('/');
  }

  return (
    <main className="PostPage">
      <article className="post">
        {post &&
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}><button className="editButton">Edit Post</button></Link>
            <button className="deleteButton" onClick={() => handleDelete(post.id)}>
              Delete Post
            </button>
          </>
        }
        {!post &&
          <>
            <h2>Post Not Found</h2>
            <p>Well, thats's disappointing.</p>
            <p>
              <Link to="/">Visit Our Homepage</Link>
            </p>
          </>
        }
      </article>
    </main>
  )
}

export default PostPage