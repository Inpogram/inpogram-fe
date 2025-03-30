import React from 'react'

export type CommonOptionType = {
  value: string
  children: React.ReactNode
  hidden?: boolean
  className?: string
}

const CommonOption: React.FC<CommonOptionType> = ({
  className,
  value,
  children,
  hidden = false,
}) => {
  return (
    <option
      className={`cursor-pointer ${className}`}
      hidden={hidden}
      value={value}
    >
      {children}
    </option>
  )
}

export default CommonOption
