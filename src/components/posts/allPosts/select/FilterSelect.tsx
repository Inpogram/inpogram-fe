import React, { useEffect, useRef, useState } from 'react'
import CaretDownIcon from '../../../ui/icon/CaretDownIcon'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { allPostsSelector } from '../../../../redux/selectors'
import allPostsSlice from '../../../../redux/reducers/allPostsSlice'

const FilterSelect = () => {
  const dispatch = useAppDispatch()
  const { filters, filtersTitle, filtersList } =
    useAppSelector(allPostsSelector)
  const [open, setOpen] = useState(false)

  const selectRef = useRef<HTMLDivElement>(null)
  const inputRefs = useRef<HTMLInputElement[]>([])

  const handleToggleDropdown = () => {
    setOpen(!open)
  }
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === 'all') {
      if (filters.length === 4) {
        inputRefs.current.forEach((item) => {
          item.checked = false
        })
        inputRefs.current[1].checked = true
      }
      if (filters.length < 4) {
        inputRefs.current.forEach((item) => {
          item.checked = true
        })
      }
    } else {
      if (
        filters.length === 2 &&
        e.currentTarget.checked &&
        !filters.includes('all')
      ) {
        inputRefs.current.forEach((item) => {
          item.checked = true
        })
      }

      if (filters.length === 4 && !e.currentTarget.checked) {
        inputRefs.current[0].checked = false
      }
      if (filters.length === 1 && !e.currentTarget.checked) {
        inputRefs.current[1].checked = true
      }
    }

    const optionValues = inputRefs.current
      .filter((ref) => ref.checked)
      .map((ref) => ref.value)

    dispatch(allPostsSlice.actions.changeFilters(optionValues))
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

  return (
    <div
      ref={selectRef}
      className="inline-block relative rounded-md border-[#DEE1E6] border-[1px] "
    >
      <div
        onClick={handleToggleDropdown}
        className="px-3 py-2 cursor-pointer flex items-center gap-3"
      >
        <div className="max-w-sm whitespace-nowrap">
          {filtersTitle.join(', ')}
        </div>
        <CaretDownIcon className="w-4 h-4" color="#171A1F" />
      </div>

      {open && (
        <div className="z-10 absolute left-0 w-max bg-white text-left border-gray-300 border-[1px] rounded p-3 space-y-2">
          {filtersList.map((item, index) => (
            <div className="flex  items-center gap-2" key={index}>
              <input
                ref={(el) => {
                  if (el && !inputRefs.current.includes(el))
                    inputRefs.current.push(el)
                }}
                id={`checkbox-+${index}`}
                type="checkbox"
                value={item.value}
                onChange={handleOptionChange}
                defaultChecked={filters.includes(item.value)}
                className="w-4 h-4   text-[#4B7BEC] checked:border-none  rounded "
              />
              <label
                htmlFor={`checkbox-+${index}`}
                className="text-base cursor-pointer font-medium whitespace-nowrap"
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FilterSelect
