import React from 'react'
import { useAppSelector } from '../../../hooks'
import { postDetailsSelector } from '../../../redux/selectors'

const PostDetailsContent = () => {
  const { initialPost } = useAppSelector(postDetailsSelector)
  const { content } = initialPost.data
  return (
    <div className="text-left mt-[40px]">
      <div
        dangerouslySetInnerHTML={{
          __html: content
        }}
      />
    </div>
  )
}

export default PostDetailsContent
