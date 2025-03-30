import React from 'react'
import CommonButton from '../../../ui/button/CommonButton'

type ModifySubPostsButtonType = {
  onClick: () => void

  children: string
  isDisabled: boolean
}

const ModifySubPostsButton: React.FC<ModifySubPostsButtonType> = ({
  onClick,
  children,

  isDisabled
}) => {
  return (
    <CommonButton
      type="button"
      className={`placeholder:text-slate-400 hover:bg-[#f5f6f7]  px-4 py-2 
    border border-slate-300 shadow-sm sm:text-sm rounded  ${
      isDisabled
        ? ' pointer-events-none bg-[#F3F4F6] border-[#9095A0] opacity-[0.4]'
        : ''
    }`}
      onClick={onClick}
    >
      {children}
    </CommonButton>
  )
}

export default ModifySubPostsButton
