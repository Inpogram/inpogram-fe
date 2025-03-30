import React from 'react'
import CommonInput from './CommonInput'

type ButtonInputType = {
  title: string
  type: string
  placeholder: string
  className: string
  id: string
  name: string
  value: string
  button: React.ReactNode
  errorMessage?: string
  isDisabled?: boolean
  isCreateClicked?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ButtonInput: React.FC<ButtonInputType> = ({
  title,
  type,
  placeholder,
  className,
  id,
  name,
  value,
  button,
  errorMessage,
  isDisabled = false,
  isCreateClicked = false,
  onChange,
}) => {
  return (
    <>
      <div className={className}>
        <label className="flex flex-row items-start">{title}&nbsp;</label>
        <CommonInput
          type={type}
          placeholder={placeholder}
          className={`placeholder:text-slate-400 block w-full p-2 shadow-sm sm:text-sm rounded-lg border ${
            isDisabled
              ? 'pointer-events-none bg-[#F3F4F6] border-[#9095A0] opacity-[0.4]'
              : errorMessage && isCreateClicked
              ? 'bg-white border-red-500 focus:outline-none focus:ring-1 focus:border-red-500 focus:ring-red-500'
              : 'bg-white border-slate-300 shadow-sm focus:outline-none focus:ring-0 focus:border-[#242424]'
          }`}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
        />
        {button}
      </div>
      {errorMessage && (
        <p className="text-red-500 text-[0.7rem] leading-3">{errorMessage}</p>
      )}
    </>
  )
}

export default ButtonInput
