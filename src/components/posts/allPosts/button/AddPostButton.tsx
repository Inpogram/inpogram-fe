import React from 'react'
import CommonButton from '../../../ui/button/CommonButton'
import PlusIcon from '../../../ui/icon/PlusIcon'
import { Link } from 'react-router-dom'

const AddPostButton = () => {
  return (
    <Link to="/posts/add">
      <CommonButton
        className="rounded-md bg-[#3067E9] hover:bg-[#2654c0] flex flex-row items-center gap-2 text-white font-medium py-2 px-2.5 cursor-pointer"
        startIcon={<PlusIcon className="w-4 h-4 " color="#FFFFFF" />}
      >
        Add New
      </CommonButton>
    </Link>
  )
}

export default AddPostButton
