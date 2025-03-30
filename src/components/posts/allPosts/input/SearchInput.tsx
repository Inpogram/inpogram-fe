import React from 'react'
import CommonInput from '../../../ui/input/CommonInput'
import SearchIcon from '../../../ui/icon/SearchIcon'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { allPostsSelector } from '../../../../redux/selectors'
import allPostsSlice from '../../../../redux/reducers/allPostsSlice'
import { useSearchParams } from 'react-router-dom'
const SearchInput = () => {
  const [_searchParams, setSearchParams] = useSearchParams()
  const dispatch = useAppDispatch()
  const { filters, q, sortBy, sortOrder, page, size } =
    useAppSelector(allPostsSelector)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(allPostsSlice.actions.changeQuery(e.target.value))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchParams({
        q,
        filters: filters.join(','),
        sortBy,
        sortOrder,
        page,
        size
      })
    }
  }

  return (
    <div className="relative">
      <div
        style={{ transform: 'translate(-50%, -50%)' }}
        className="absolute top-[50%] left-[10%]"
      >
        <SearchIcon className="w-4 h-4 " color="#171A1F" />
      </div>
      <CommonInput
        className="pl-10 max-w-[200px] py-2 border-[#DEE1E6] placeholder:text-slate-400 text-base w-full border  rounded"
        type="text"
        value={q}
        onKeyDown={handleKeyDown}
        onChange={handleSearchChange}
        placeholder="Search"
      />
    </div>
  )
}

export default SearchInput
