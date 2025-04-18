import React from 'react'

type CheckIconType = {
  className: string
  color: string
}

const CheckIcon: React.FC<CheckIconType> = ({ className, color }) => {
  return (
    <svg
      className={className}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        className="stroke-2"
        d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41L9 16.17z"
      />
    </svg>
  )
}

export default CheckIcon
