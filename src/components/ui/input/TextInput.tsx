import React from 'react'
import CommonInput from './CommonInput'

type TextInputType = {
  title: string
  placeholder: string
  id: string
  name: string
  value: string
  isRequired: boolean
  errorMessage?: string
  isDisabled?: boolean
  isCreateClicked?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput: React.FC<TextInputType> = ({
  title,
  placeholder,
  id,
  name,
  value,
  isRequired,
  errorMessage,
  isDisabled = false,
  isCreateClicked = false,
  onChange,
}) => {
  return (
    <>
      <label className="flex flex-row items-start">
        {title}&nbsp;
        {isRequired && <span className="text-red-500">*</span>}
      </label>
      <CommonInput
        type={'text'}
        className={`placeholder:text-slate-400 block w-full border p-2 shadow-sm sm:text-sm rounded ${
          isDisabled
            ? 'pointer-events-none bg-[#F3F4F6] border-[#9095A0] opacity-[0.4]'
            : errorMessage && isCreateClicked
            ? 'bg-white border-red-500 focus:outline-none focus:ring-1 focus:border-red-500 focus:ring-red-500'
            : 'bg-white border-slate-300 shadow-sm focus:outline-none focus:ring-1 focus:border-sky-500 focus:ring-sky-500'
        }
        }`}
        placeholder={placeholder}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
      {errorMessage && (
        <p className="text-red-500 text-[0.7rem] leading-3">{errorMessage}</p>
      )}
    </>
  )
}

export default TextInput
