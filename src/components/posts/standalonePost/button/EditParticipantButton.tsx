import React, { useEffect, useRef, useState } from 'react'
import CommonButton from '../../../ui/button/CommonButton'
import CaretDownIcon from '../../../ui/icon/CaretDownIcon'
import { unregisterUserThunk } from '../../../../redux/reducers/postDetailsSlice'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { postDetailsSelector } from '../../../../redux/selectors'

const EditParticipantButton = ({ userId }) => {
  const [open, setOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)
  const inputRefs = useRef<HTMLInputElement[]>([])
  const { initialPost } = useAppSelector(postDetailsSelector)
  const dispatch = useAppDispatch()

  const editList = [
    { title: 'View this participant', handleClick: () => {} },
    {
      title: 'Remove this participant',
      handleClick: (userId: string) => {
        dispatch(
          unregisterUserThunk({
            activityTitle: initialPost.data.title,
            userId
          })
        )
      }
    }
  ]

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      inputRefs.current = []
      setOpen(false)
    }
  }

  const handleToggleDropdown = () => {
    setOpen(!open)
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
      className="inline-block  w-[75%] relative rounded-md  "
    >
      {!open ? (
        <CommonButton
          onClick={handleToggleDropdown}
          className="text-[#4B7BEC]   bg-[#F1F5FE] hover:bg-[#DCE6FB] rounded-md py-2 px-4"
        >
          Edit
        </CommonButton>
      ) : (
        <div
          onClick={handleToggleDropdown}
          className=" rounded-md  border-[#DEE1E6] border-[1px]  px-3 py-2 cursor-pointer flex items-center "
        >
          <div className="max-w-sm whitespace-nowrap">Edit</div>
          <div className="flex-grow"></div>
          <CaretDownIcon className="w-4 h-4" color="#171A1F" />
        </div>
      )}

      {open && (
        <div className="z-[100] absolute left-0 right-0  bg-white text-left border-gray-300 border-[1px] rounded">
          {editList.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer font-medium   hover:bg-gray-50 p-3"
              onClick={() => item.handleClick(userId)}
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EditParticipantButton
