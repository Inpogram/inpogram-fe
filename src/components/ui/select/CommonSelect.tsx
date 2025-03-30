import React from 'react'

type CommonSelectType = {
  className: string
  children: React.ReactNode
  defaultValue?: string
  id?: string
  name?: string
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const CommonSelect: React.FC<CommonSelectType> = ({
  className,
  children,
  name,
  id,
  defaultValue,
  onChange,
}) => {
  return (
    <div>
      <select
        defaultValue={defaultValue}
        id={id}
        name={name}
        className={className}
        onChange={onChange}
      >
        {children}
      </select>
    </div>
  )
}
