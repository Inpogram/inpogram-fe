import React, { useState } from 'react'
import CommonPopup from './CommonPopup'

type InputPopupType = {
  title: string
  isOpen: boolean
  isRejected: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleReject: any // Fix here
  handleUnregister: any
  setShowRejectSuccessPopUp: React.Dispatch<React.SetStateAction<boolean>>
}

const InputPopup: React.FC<InputPopupType> = ({
  title,
  isOpen,
  isRejected,
  setIsOpen,
  handleReject,
  handleUnregister,
  setShowRejectSuccessPopUp,
}) => {
  const [message, setMessage] = useState('')
  return (
    <CommonPopup isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="bg-neutral-50 border-2 border-neutral-200 rounded-lg shadow-lg p-4 w-full min-w-[500px]">
        <p className="mb-8 text-left">{title}</p>
        <textarea
          name="reason"
          placeholder="Leave your notes"
          className="w-full rounded-md h-24"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
          }}
        />
        <div className="text-right">
          <button
            className="bg-[#9095A0] font-medium m-2 py-2 px-4 rounded text-white"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className={`${
              isRejected ? 'bg-[#F22128]' : 'bg-[#4B7BEC]'
            }  font-medium m-2 py-2 px-4 rounded text-white`}
            onClick={() => {
              if (isRejected) {
                handleReject(message)
              } else {
                handleUnregister(message)
              }
              setIsOpen(false)
              setShowRejectSuccessPopUp(true)
            }}
          >
            {isRejected ? 'Reject' : 'Confirm'}
          </button>
        </div>
      </div>
    </CommonPopup>
  )
}

export default InputPopup
