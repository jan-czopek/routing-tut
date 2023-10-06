import { store } from '../../app/store'
import { postsApiSlice } from '../posts/postsApiSlice'
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
  useEffect(() => {
    console.log('subscribing')
    const posts = store.dispatch(postsApiSlice.endpoints.getPosts.initiate())
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

    return () => {
      console.log('unsubscribing')
      posts.unsubscribe()
      users.unsubscribe()
    }
  }, [])

  return <Outlet />
}
export default Prefetch