import React from 'react'
import PostDetailsHeader from './PostDetailsHeader'
import PostDetailsFooter from './PostDetailsFooter'
import { isEmpty } from 'lodash'
import PostDetailsContent from './PostDetailsContent'

type PostDetailsType = {
  postTitle: string
}

const PostDetails: React.FC<PostDetailsType> = ({ postTitle }) => {
  return (
    <>
      {!isEmpty(null) && (
        <>
          <div className="flex justify-center items-center text-left">
            <div className="max-w-[680px] mx-[24px] whitespace-normal overflow-auto">
              <PostDetailsHeader />
              <PostDetailsContent />
            </div>
          </div>
          <div className="bg-[#F9F9F9]">
            <PostDetailsFooter />
          </div>
        </>
      )}
    </>
  )
}

export default PostDetails
