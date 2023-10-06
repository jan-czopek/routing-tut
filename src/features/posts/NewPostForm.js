import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCreatePostMutation } from "./postsApiSlice"

const NewPostForm = ({ users }) => {

  const [createPost, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useCreatePostMutation()

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [userId, setUserId] = useState(users[0].id)

  useEffect(() => {
    if (isSuccess) {
      setTitle('')
      setBody('')
      setUserId('')
      navigate('/dash/posts')
    }
  }, [isSuccess, navigate])

  const onTitleChanged = e => setTitle(e.target.value)
  const onBodyChanged = e => setBody(e.target.value)
  const onUserIdChanged = e => setUserId(e.target.value)

  const canSave = [title, body, userId].every(Boolean) && !isLoading

  const onSavePostClicked = async (e) => {
    e.preventDefault()
    if (canSave) {
      await createPost({ userId: userId, title, body })
    }
  }

  const options = users.map(user => {
    return (
      <option
        key={user.id}
        value={user.id}
      > {user.userName}</option >
    )
  })

  const errClass = isError ? "errmsg" : "offscreen"
  const validTitleClass = !title ? "form__input--incomplete" : ''
  const validBodyClass = !body ? "form__input--incomplete" : ''

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSavePostClicked}>
        <div className="form__title-row">
          <h2>New Post</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              disabled={!canSave}
            >
              Save
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="title">
          Title:</label>
        <input
          className={`form__input ${validTitleClass}`}
          id="title"
          name="title"
          type="body"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />

        <label className="form__label" htmlFor="body">
          Body:</label>
        <textarea
          className={`form__input form__input--body ${validBodyClass}`}
          id="body"
          name="body"
          value={body}
          onChange={onBodyChanged}
        />

        <label className="form__label form__checkbox-container" htmlFor="userName">
          ASSIGNED TO:</label>
        <select
          id="userName"
          name="userName"
          className="form__select"
          value={userId}
          onChange={onUserIdChanged}
        >
          {options}
        </select>

      </form>
    </>
  )

  return content
}

export default NewPostForm