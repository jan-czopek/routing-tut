import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import PostsList from './features/posts/PostsList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditPost from './features/posts/EditPost'
import NewPost from './features/posts/NewPost'
import Prefetch from './features/auth/Prefetch'


// import Header from './Header';
// import Nav from './Nav';
// import Footer from './Footer';
// import Home from './Home';
// import NewPost from './NewPost';
// import PostPage from './PostPage';
// import EditPost from './EditPost';
// import About from './About';
// import Missing from './Missing';
// import { useEffect } from 'react';
// import useAxiosFetch from './hooks/useAxiosFetch';
// import { useStoreActions } from 'easy-peasy';

function App() {
  // const setPosts = useStoreActions((actions) => actions.setPosts);
  // const { data, fetchError, isLoading } = useAxiosFetch(`${process.env.REACT_APP_BASE_URL}/posts`);

  // useEffect(() => {
  //   setPosts(data);
  // }, [data, setPosts]);
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route element={<Prefetch />}>
          <Route path="dash" element={<DashLayout />}>

            <Route index element={<Welcome />} />

            <Route path="users">
              <Route index element={<UsersList />} />
              <Route path=':id' element={<EditUser />} />
              <Route path='new' element={<NewUserForm />} />
            </Route>

            <Route path="posts">
              <Route index element={<PostsList />} />
              <Route path=':id' element={<EditPost />} />
              <Route path='new' element={<NewPost />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
    // <div className="App">
    //   <Header title="My Blog" />
    //   <Nav />
    //   <Switch>
    //     <Route exact path="/">
    //       <Home
    //         isLoading={isLoading}
    //         fetchError={fetchError}
    //       />
    //     </Route>
    //     <Route exact path="/post" component={NewPost} />
    //     <Route path="/edit/:id" component={EditPost} />
    //     <Route path="/post/:id" component={PostPage} />
    //     <Route path="/about" component={About} />
    //     <Route path="*" component={Missing} />
    //   </Switch>
    //   <Footer />
    // </div>
  );
}

export default App;
