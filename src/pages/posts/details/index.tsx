/* eslint-disable @typescript-eslint/no-non-null-assertion */
import PostDetails from '../../../components/posts/standalonePost'
import { useParams } from 'react-router-dom'
import LinkButton from '../../../components/ui/button/LinkButton'
import React from 'react'

const PostDetailsPage = () => {
  const { postTitle } = useParams()

  return (
    <div>
      <PostDetails postTitle={postTitle!} />
    </div>
  )
}

export default PostDetailsPage
