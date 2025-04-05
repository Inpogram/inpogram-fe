import React from 'react'
import { PostFormData } from '../../../modules/posts/types'
import { validationRules } from '../../../modules/posts/validation'

type CommonInputProps = {
  type: string
  className?: string
  id?: string
  name: keyof PostFormData
  value?: any
  placeholder?: string
  defaultValue?: string
  disabled?: boolean
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const CommonInput = React.forwardRef<HTMLInputElement, CommonInputProps>(
  (
    {
      type,
      className,
      id,
      name,
      value,
      placeholder,
      defaultValue,
      disabled,
      onKeyDown,
      onFocus,
      onBlur,
      onChange
    },
    ref
  ) => {
    return (
      <input
        type={type}
        className={className}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        ref={ref}
      />
    )
  }
)

export default CommonInput
