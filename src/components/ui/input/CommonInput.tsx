import React from 'react'

type CommonInputType = {
  type: string
  value: string
  className?: string
  id?: string
  name?: string
  placeholder?: string
  defaultValue?: string
  minDate?: string
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const CommonInput: React.FC<CommonInputType> = ({
  type,
  value,
  className,
  id,
  name,
  placeholder,
  defaultValue,
  minDate,
  onKeyDown,
  onChange,
  onFocus,
}) => {
  return (
    <input
      type={type}
      className={className}
      id={id}
      name={name}
      value={value}
      onKeyDown={onKeyDown}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={onChange}
      onFocus={onFocus}
      min={minDate}
    />
  )
}

export default CommonInput
