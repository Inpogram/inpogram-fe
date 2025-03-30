import React from 'react'
import CheckCircleIcon from '../icon/CheckCircleIcon'
import XCircleIcon from '../icon/XCircleIcon'
import CommonPopup from './CommonPopup'

type ResultPopupType = {
  isOpen: boolean
  isSuccess: boolean
  message: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ResultPopup: React.FC<ResultPopupType> = ({
  isOpen,
  isSuccess,
  message,
  setIsOpen,
}) => {
  return (
    <CommonPopup isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="bg-neutral-50 border-2 border-neutral-200 rounded-lg shadow-lg p-6 w-full min-w-[400px] max-w-[400px]">
        {isSuccess ? (
          <CheckCircleIcon color="#75AF73" className="w-16 h-16 m-auto mb-4" />
        ) : (
          <XCircleIcon color="#F22128" className="w-16 h-16 m-auto mb-4" />
        )}
        <p className="mb-6">{message}</p>
      </div>
    </CommonPopup>
  )
}

export default ResultPopup
