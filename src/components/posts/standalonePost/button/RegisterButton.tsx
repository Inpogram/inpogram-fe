import React from 'react'
import CommonButton from '../../../ui/button/CommonButton'
import CaretDownIcon from '../../../ui/icon/CaretDownIcon'

export type RegisterButtonType = {
  name: string
  hasDropdown: boolean
  color: string
  dropdownRef?: React.RefObject<HTMLButtonElement>
  isOpenDropDown?: boolean
  toggleDropdown?: () => void
  selections?: {
    name: string
    togglePopUp: () => void
  }[]
  clickHandler?: () => void
}

const RegisterButton: React.FC<RegisterButtonType> = ({
  name,
  hasDropdown,
  color,
  dropdownRef,
  isOpenDropDown,
  toggleDropdown,
  selections,
  clickHandler,
}) => {
  return (
    <CommonButton
      startIcon={
        hasDropdown && (
          <CaretDownIcon
            color="#ffff"
            className="absolute top-[5px] left-[128px] fill-white h-[24px] w-[24px]"
          />
        )
      }
      className={`relative rounded-full text-white ${
        hasDropdown ? 'px-[55px]' : 'px-[40px]'
      } py-[5px] ${color} ${
        !hasDropdown && !clickHandler && 'hover:cursor-default'
      }`}
      onClick={hasDropdown ? toggleDropdown : clickHandler}
      buttonRef={dropdownRef}
    >
      {name}
      {isOpenDropDown && (
        <div className="absolute items-center mt-2 py-2 left-0 right-0 bg-white rounded-md shadow-lg z-10">
          {selections?.map((selection) => (
            <a
              key={selection.name}
              className="block px-4  py-2 text-black hover:bg-gray-200 text-left"
              onClick={() => selection.togglePopUp()}
            >
              {selection.name}
            </a>
          ))}
        </div>
      )}
    </CommonButton>
  )
}

export default RegisterButton
