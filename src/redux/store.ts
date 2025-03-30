import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../auth/authSlice'
import addPostSlice from './reducers/addPostSlice'
import editPostSlice from './reducers/editPostSlice'
import allPostsSlice from './reducers/allPostsSlice'
import postDetailsSlice from './reducers/postDetailsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    addPost: addPostSlice.reducer,
    editPost: editPostSlice.reducer,
    allPosts: allPostsSlice.reducer,
    postDetails: postDetailsSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store
