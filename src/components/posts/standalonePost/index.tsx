import React, { useEffect } from 'react'
import PostDetailsHeader from './PostDetailsHeader'
import PostDetailsFooter from './PostDetailsFooter'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { postDetailsSelector, authSelector } from '../../../redux/selectors'
import { getPostByTitleThunk } from '../../../redux/reducers/postDetailsSlice'
import { isEmpty } from 'lodash'
import PostDetailsContent from './PostDetailsContent'

type PostDetailsType = {
  postTitle: string
}

const PostDetails: React.FC<PostDetailsType> = ({ postTitle }) => {
  const dispatch = useAppDispatch()
  const { initialPost, reload } = useAppSelector(postDetailsSelector)

  useEffect(() => {
    dispatch(getPostByTitleThunk(postTitle))
  }, [postTitle, reload])

  return (
    <>
      {!isEmpty(initialPost.data) && (
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
