import React from 'react'

type PlusIconType = {
  color: string
  className?: string
}
const PlusIcon: React.FC<PlusIconType> = ({ color, className }) => {
  return (
    <svg
      className={className}
      fill={color}
      id="Flat"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
    >
      <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
    </svg>
  )
}

export default PlusIcon
