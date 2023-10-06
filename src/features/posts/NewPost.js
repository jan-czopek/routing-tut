import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewPostForm from './NewPostForm'

const NewPost = () => {
  const users = useSelector(selectAllUsers)

  if (!users?.length) return <p>Not Currently Available</p>

  const content = <NewPostForm users={users} />

  return content
}
export default NewPost


// import { useHistory } from 'react-router-dom';
// import { useStoreState, useStoreActions } from 'easy-peasy';

// const NewPost = () => {
//   const history = useHistory();

//   const postTitle = useStoreState((state) => state.postTitle);
//   const postBody = useStoreState((state) => state.postBody);

//   const savePost = useStoreActions((actions) => actions.savePost);
//   const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
//   const setPostBody = useStoreActions((actions) => actions.setPostBody);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newPost = { title: postTitle, body: postBody };
//     savePost(newPost);
//     history.push('/');
//   }
//   return (
//     <main className="NewPost">
//       <h2>NewPost</h2>
//       <form className="newPostForm" onSubmit={handleSubmit}>
//         <label htmlFor="postTitle">Title:</label>
//         <input
//           id="postTitle"
//           type="text"
//           required
//           value={postTitle}
//           onChange={(e) => setPostTitle(e.target.value)}
//         />
//         <label htmlFor="postBody">Post:</label>
//         <textarea
//           id="postBody"
//           required
//           value={postBody}
//           onChange={(e) => setPostBody(e.target.value)}
//         />
//         <button type="submit">Submit</button>
//       </form>
//     </main>
//   )
// }

// export default NewPost