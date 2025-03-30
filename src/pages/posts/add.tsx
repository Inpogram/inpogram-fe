import React, { useEffect } from 'react'
import AddPost from '../../components/posts/addPost'
import { useAppDispatch } from '../../hooks'
import addPostSlice from '../../redux/reducers/addPostSlice'

const AddPostPage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      dispatch(addPostSlice.actions.reset())
    }
  }, [])
  return (
    <div className="flex flex-col mt-6">
      <AddPost />
    </div>
  )
}

export default AddPostPage
