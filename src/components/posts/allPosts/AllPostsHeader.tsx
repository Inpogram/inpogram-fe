import React from 'react'
import AddPostButton from './button/AddPostButton'
import FilterSelect from './select/FilterSelect'
import SearchInput from './input/SearchInput'
import SortSelect from './select/SortSelect'
import { useAppSelector } from '../../../hooks'
import { allPostsSelector } from '../../../redux/selectors'

const AllPostsHeader = () => {
  const { pagination } = useAppSelector(allPostsSelector)
  return (
    <div className="flex flex-row flex-wrap items-end mb-4 mt-10 gap-3">
      <h1 className=" text-lg font-semibold text-gray-900 uppercase">
        Posts ({pagination.items.total})
      </h1>
      <div className="flex-grow"></div>
      <div className="flex flex-wrap gap-3 items-center">
        <FilterSelect />

        <SearchInput />
        <SortSelect />
        <AddPostButton />
      </div>
    </div>
  )
}

export default AllPostsHeader
