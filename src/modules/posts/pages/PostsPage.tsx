import React from 'react'
import AllPosts from '../../../components/posts/allPosts'

const PostsPage = () => {
  // if (error instanceof Error) return <>An error has occurred: {error.message}</>
  return <AllPosts loading={true} allPosts={[]} />
}

export default PostsPage
