import React from 'react'
import AddPostButton from './button/AddPostButton'
import { useAppSelector } from '../../../hooks'

const AllPostsHeader = () => {
  return (
    <div className="flex flex-row flex-wrap items-end mb-4 mt-10 gap-3">
      <h1 className=" text-lg font-semibold text-gray-900 uppercase">Posts</h1>
      <div className="flex-grow"></div>
      <div className="flex flex-wrap gap-3 items-center">
        <AddPostButton />
      </div>
    </div>
  )
}

export default AllPostsHeader
