import React, { useEffect, useRef, useState } from 'react'
import CommonInput from './CommonInput'
import moment from 'moment'

type DateTimeInputType = {
  title: string
  type: string
  id: string
  name: string
  value: string
  isRequired: boolean
  errorMessage?: string
  warningMessage?: string
  isDisabled?: boolean
  isCreateClicked?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const DateTimeInput: React.FC<DateTimeInputType> = ({
  title,
  type,
  id,
  name,
  value,
  isRequired,
  errorMessage,
  warningMessage,
  isDisabled = false,
  isCreateClicked = false,
  onChange,
}) => {
  const titleRef = useRef<HTMLDivElement>(null)
  const warningMessageRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (titleRef.current && warningMessageRef.current) {
      warningMessageRef!.current!.style.left = `${
        titleRef!.current!.offsetWidth + 16
      }px`
    }
  }, [])

  return (
    <div className="flex flex-col gap-2">
      <label className="flex flex-row items-start">
        <div className="relative" ref={titleRef}>
          {title}&nbsp;
          <div
            className={`absolute z-50 top-[-2px] px-2 rounded-sm shadow-2xl shadow-[#106ae0] text-white text-[11px] bg-[#FAB740E6] ${
              warningMessage ? 'block' : 'hidden'
            }`}
            ref={warningMessageRef}
          >
            <div className="relative z-50 whitespace-nowrap">
              {warningMessage}
            </div>
            <div className="absolute left-[15px] bottom-0 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-1.5 h-1.5 bg-[#FAB740E6]"></div>
          </div>
        </div>
        {isRequired && <span className="text-red-500">*</span>}
      </label>
      <CommonInput
        type={type}
        className={`placeholder:text-slate-400 block w-full border p-2 shadow-sm sm:text-sm rounded ${
          isDisabled
            ? 'pointer-events-none bg-[#F3F4F6] border-[#9095A0] opacity-[0.4]'
            : errorMessage && isCreateClicked
            ? 'bg-white border-red-500 focus:outline-none focus:ring-1 focus:border-red-500 focus:ring-red-500'
            : 'bg-white border-slate-300 shadow-sm focus:outline-none focus:ring-1 focus:border-sky-500 focus:ring-sky-500'
        }`}
        id={id}
        name={name}
        value={value}
        minDate={moment().format('YYYY-MM-DD')}
        onChange={onChange}
      />
      {errorMessage && (
        <p className="text-red-500 text-[0.7rem] leading-3">{errorMessage}</p>
      )}
    </div>
  )
}

export default DateTimeInput
