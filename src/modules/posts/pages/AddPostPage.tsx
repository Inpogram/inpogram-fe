import React from 'react'
import PostForm from '../components/PostForm'

const AddPostPage = () => {
  const initialValues = {
    title: '',
    content: '',
    availableTags: [],
    tags: [],
    featuredImage: null,
    featuredImageName: 'Upload image file (.png, .jpg, .jpeg)'
  }

  return (
    <div className="flex flex-col mt-6">
      <PostForm initialValues={initialValues} />
    </div>
  )
}

export default AddPostPage
