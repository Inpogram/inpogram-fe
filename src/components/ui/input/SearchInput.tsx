import React from 'react'
import SearchIcon from '../icon/SearchIcon'
import CommonInput from './CommonInput'

type SearchInputType = {
  value: string
  className?: string
}

const SearchInput: React.FC<SearchInputType> = ({ value, className }) => {
  return (
    <div className="relative">
      <div
        style={{ transform: 'translate(-50%, -50%)' }}
        className="absolute top-[50%] left-[8%]"
      >
        <SearchIcon className="w-4 h-4 " color="#6B6B6B" />
      </div>
      <CommonInput
        className={`focus:ring-0 pl-14 max-w-[600px] py-2 border-none placeholder:text-[#242424] text-base w-full border rounded-full bg-[#242424] bg-opacity-5 ${className}`}
        type="text"
        value={value}
        placeholder="Search posts"
      />
    </div>
  )
}

export default SearchInput
