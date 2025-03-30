import React from 'react'
import CommonButton from '../../ui/button/CommonButton'

type AddPostFooterType = {
  handleAddPost: () => void
  handleCancelAddPost: () => void
}

const AddPostFooter: React.FC<AddPostFooterType> = ({
  handleAddPost: handleAddPost,
  handleCancelAddPost: handleCancelAddPost
}) => {
  return (
    <div className="flex flex-row justify-end gap-2 items-center">
      <CommonButton
        onClick={handleAddPost}
        className="rounded-md bg-[#027A48] hover:bg-[#154733] flex flex-row items-center gap-2 text-white font-medium text-sm py-1 px-3 h-[30px]"
      >
        Publish
      </CommonButton>

      <CommonButton
        type="button"
        onClick={handleCancelAddPost}
        className="rounded-md bg-white hover:text-[#242424] flex flex-row items-center gap-2 text-[#6B6B6B] font-medium text-sm py-1 px-3  h-[30px]"
      >
        Cancel
      </CommonButton>
    </div>
  )
}

export default AddPostFooter
