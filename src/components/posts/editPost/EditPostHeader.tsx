import React from 'react'
import CommonButton from '../../ui/button/CommonButton'

type EditPostHeaderType = {
  handleEditPost: () => void
  handleCancelEditPost: () => void
}

const EditPostHeader: React.FC<EditPostHeaderType> = ({
  handleEditPost,
  handleCancelEditPost
}) => {
  return (
    <div className="flex flex-row  items-center justify-between ">
      <div className="flex flex-col items-start">
        <p className="text-xl">New Post</p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <CommonButton
          onClick={handleEditPost}
          className="rounded-md bg-[#4B7BEC] hover:bg-[#3963c5] flex flex-row items-center gap-2 text-white font-medium text-sm py-1 px-3 h-[30px]"
        >
          Update
        </CommonButton>

        <CommonButton
          type="button"
          onClick={handleCancelEditPost}
          className="rounded-md bg-white hover:bg-[#d8d8d8] flex flex-row items-center gap-2 text-black font-medium text-sm py-1 px-3  h-[30px]"
        >
          Cancel
        </CommonButton>
      </div>
    </div>
  )
}

export default EditPostHeader
