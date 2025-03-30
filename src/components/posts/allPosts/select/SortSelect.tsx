import React, { useEffect, useRef, useState } from 'react'
import FunnelIcon from '../../../ui/icon/FunnelIcon'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { allPostsSelector } from '../../../../redux/selectors'
import allPostsSlice from '../../../../redux/reducers/allPostsSlice'
const SortSelect = () => {
  const dispatch = useAppDispatch()
  const { sortBy, sortOrder, sortsList } = useAppSelector(allPostsSelector)
  const [open, setOpen] = useState(false)

  const selectRef = useRef<HTMLDivElement>(null)
  const inputRefs = useRef<HTMLInputElement[]>([])

  const handleToggleDropdown = () => {
    setOpen(!open)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      inputRefs.current = []
      setOpen(false)
    }
  }

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  const handleOptionChange = (option: any) => {
    dispatch(allPostsSlice.actions.changeSortBy(option.sortBy))
    dispatch(allPostsSlice.actions.changeSortOrder(option.sortOrder))
    setOpen(false)
  }

  return (
    <div
      ref={selectRef}
      className="inline-block relative border-[#DEE1E6] border-[1px] rounded-md"
    >
      <div
        onClick={handleToggleDropdown}
        className="p-3 cursor-pointer flex items-center gap-3 hover:bg-[#e7e7e7] rounded-md"
      >
        <FunnelIcon className="w-4 h-4" color="#171A1F" />
      </div>
      {open && (
        <div className="z-10 absolute left-0 w-max bg-white text-left border-gray-300 border-[1px] rounded shadow-md">
          {sortsList.map((item, index) => {
            console.log(item)

            return (
              <div
                className={`hover:bg-[#e7e7e7] px-3 py-2 cursor-pointer flex items-center gap-2 ${
                  sortBy === item.value.sortBy &&
                  sortOrder === item.value.sortOrder
                    ? 'bg-[#e7e7e7] '
                    : ''
                }`}
                key={index}
                onClick={() => handleOptionChange(item.value)}
              >
                <div>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>{item.label}</div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SortSelect
