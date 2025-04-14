import React from 'react'
import clsx from 'clsx'
import CommonInput from './CommonInput'
import { FieldError, UseFormRegister } from 'react-hook-form'
import { PostFormData } from '../../../modules/posts/types'
import { validationRules } from '../../../modules/posts/validation'

type ButtonInputType = {
  id: string
  name: keyof PostFormData
  title: string
  type: string
  placeholder: string
  className: string
  button: React.ReactNode
  value?: any
  isDisabled?: boolean
  error?: FieldError
  isSubmitting?: boolean
  register: UseFormRegister<PostFormData>
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ButtonInput: React.FC<ButtonInputType> = ({
  id,
  name,
  title,
  type,
  placeholder,
  className,
  button,
  value,
  isDisabled = false,
  error,
  isSubmitting,
  register,
  onChange
}) => {
  const inputClasses = clsx(
    'placeholder:text-slate-400 block w-full p-2 shadow-sm sm:text-sm rounded-lg border',
    {
      'pointer-events-none bg-[#F3F4F6] border-[#9095A0] opacity-[0.4]':
        isDisabled,
      'bg-white border-red-500 focus:outline-none focus:ring-1 focus:border-red-500 focus:ring-red-500':
        error,
      'bg-white border-slate-300 shadow-sm focus:outline-none focus:ring-0 focus:border-[#242424]':
        !isDisabled && !error
    }
  )

  const fieldValidation = validationRules[name] || {}
  console.log({ error })

  return (
    <>
      <div className={className}>
        <label htmlFor={name} className="flex flex-row items-start">
          {title}&nbsp;
        </label>
        <CommonInput
          {...register(name, fieldValidation)}
          type={type}
          placeholder={placeholder}
          className={inputClasses}
          id={id}
          name={name}
          value={value}
          disabled={isSubmitting}
          onChange={onChange}
        />
        {button}
      </div>
      {error && (
        <p className="text-red-500 text-[0.7rem] leading-3">{error.message}</p>
      )}
    </>
  )
}

export default ButtonInput
