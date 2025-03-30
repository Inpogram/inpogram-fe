import React from 'react'

type MinusIconIconType = {
  color: string
  className?: string
}

const MinusIcon: React.FC<MinusIconIconType> = ({ color, className }) => {
  return (
    <svg
      className={className}
      fill={color}
      id="Flat"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
    >
      <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Zm-32-80a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,128Z" />
    </svg>
  )
}

export default MinusIcon
