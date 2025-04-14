import './App.css'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/layout/NavBar'
import AddPostPage from './modules/posts/pages/AddPostPage'
import NotFound from './pages/errors/404'
import React, { useEffect } from 'react'
import Signin from './pages/auth/Signin'
import Landing from './pages/landing'
import RequireAuth from './components/auth/RequireAuth'
import Unauthorized from './pages/errors/403'
import Signup from './pages/auth/Signup'
import OAuth2RedirectHandler from './pages/auth/OAuth2RedirectHandler'
import AccountNotFound from './pages/auth/AccountNotFound'
import { ROLES } from './auth/authService'
import { Provider, useDispatch, useSelector } from 'react-redux'
import store, { AppDispatch, RootState } from './redux/store'
import { initializeAuth } from './auth/authSlice'
import PostsPage from './modules/posts/pages/PostsPage'
import PostDetailsPage from './modules/posts/pages/PostDetailsPage'

const App = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user, loading } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(initializeAuth())
  }, [dispatch])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Provider store={store}>
      <NavBar />
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/account-not-found" element={<AccountNotFound />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

        {/* protected routes */}
        <Route
          element={
            <RequireAuth
              allowedRoles={[ROLES.User, ROLES.Member, ROLES.Admin]}
            />
          }
        >
          <Route path="/posts/add" element={<AddPostPage />} />
        </Route>

        <Route
          element={
            <RequireAuth
              allowedRoles={[ROLES.User, ROLES.Member, ROLES.Admin]}
            />
          }
        >
          <Route path="/posts" element={<PostsPage />} />
        </Route>

        <Route
          element={
            <RequireAuth
              allowedRoles={[ROLES.User, ROLES.Member, ROLES.Admin]}
            />
          }
        >
          <Route path="/posts/:postTitle" element={<PostDetailsPage />} />
        </Route>

        <Route
          element={
            <RequireAuth
              allowedRoles={[ROLES.User, ROLES.Member, ROLES.Admin]}
            />
          }
        >
          <Route path="/posts/:postTitle/edit" element={<AddPostPage />} />
        </Route>

        {/* missing routes */}
        <Route
          path="*"
          element={
            <NotFound
              message={'It looks like nothing was found at this location.'}
            />
          }
        />
      </Routes>
    </Provider>
  )
}

export default App
