import { useState, useEffect } from "react"
import { useUpdatePostMutation, useDeletePostMutation } from "./postsApiSlice"
import { useNavigate } from "react-router-dom"

const EditPostForm = ({ post, users }) => {

  const [updatePost, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdatePostMutation()

  const [deletePost, {
    isSuccess: isDelSuccess,
    isError: isDelError,
    error: delerror
  }] = useDeletePostMutation()

  const navigate = useNavigate()

  const [title, setTitle] = useState(post.title)
  const [body, setBody] = useState(post.body)
  const [userId, setUserId] = useState(post.userId)

  useEffect(() => {

    if (isSuccess || isDelSuccess) {
      setTitle('')
      setBody('')
      setUserId('')
      navigate('/dash/posts')
    }

  }, [isSuccess, isDelSuccess, navigate])

  const onTitleChanged = e => setTitle(e.target.value)
  const onBodyChanged = e => setBody(e.target.value)
  const onUserIdChanged = e => setUserId(e.target.value)

  const canSave = [title, body, userId].every(Boolean) && !isLoading

  const onSavePostClicked = async (e) => {
    if (canSave) {
      await updatePost({ id: post.id, userId: userId, title, body })
    }
  }

  const onDeletePostClicked = async () => {
    await deletePost({ id: post.id })
  }

  const created = new Date(post.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
  const updated = new Date(post.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

  const options = users.map(user => {
    return (
      <option
        key={user.id}
        value={user.id}

      > {user.userName}</option >
    )
  })

  const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
  const validTitleClass = !title ? "form__input--incomplete" : ''
  const validBodyClass = !body ? "form__input--incomplete" : ''

  const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={e => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Post #{post.ticket}</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSavePostClicked}
              disabled={!canSave}
            >
              Save
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={onDeletePostClicked}
            >
              Delete
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="post-title">
          Title:</label>
        <input
          className={`form__input ${validTitleClass}`}
          id="post-title"
          name="title"
          type="body"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />

        <label className="form__label" htmlFor="post-body">
          Body:</label>
        <textarea
          className={`form__input form__input--body ${validBodyClass}`}
          id="post-body"
          name="body"
          value={body}
          onChange={onBodyChanged}
        />
        <div className="form__row">
          <div className="form__divider">
            <label className="form__label form__checkbox-container" htmlFor="post-userName">
              ASSIGNED TO:</label>
            <select
              id="post-userName"
              name="userName"
              className="form__select"
              value={userId}
              onChange={onUserIdChanged}
            >
              {options}
            </select>
          </div>
          <div className="form__divider">
            <p className="form__created">Created:<br />{created}</p>
            <p className="form__updated">Updated:<br />{updated}</p>
          </div>
        </div>
      </form>
    </>
  )

  return content
}

export default EditPostForm