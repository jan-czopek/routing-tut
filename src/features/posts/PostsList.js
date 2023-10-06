import { useGetPostsQuery } from "./postsApiSlice"
import Post from "./Post"

const PostList = () => {
  const {
    data: post,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery(undefined, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = post

    content = ids?.length
      ? ids.map(postId => <Post key={postId} postId={postId} />)
      : null
  }

  return content
}
export default PostList