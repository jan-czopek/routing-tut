import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

const Login = () => {
  const userRef = useRef()
  const errRef = useRef()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [userName, password])


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ userName, password }).unwrap()
      dispatch(setCredentials({ accessToken }))
      setUserName('')
      setPassword('')
      navigate('/dash')
    } catch (err) {
      if (!err.status) {
        setErrMsg('No Server Response');
      } else if (err.status === 400) {
        setErrMsg('Missing UserName or Password');
      } else if (err.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  }

  const handleUserInput = (e) => setUserName(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)

  const errClass = errMsg ? "errmsg" : "offscreen"

  if (isLoading) return <p>Loading...</p>

  const content = (
    <section className="public">
      <header>
        <h1>Login</h1>
      </header>
      <main className="login">
        <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="userName">UserName:</label>
          <input
            className="form__input"
            type="text"
            id="userName"
            ref={userRef}
            value={userName}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            className="form__input"
            type="password"
            id="password"
            onChange={handlePwdInput}
            value={password}
            required
          />
          <button className="form__submit-button">Sign In</button>
        </form>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  )

  return content
}
export default Login