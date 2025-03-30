import React from 'react'
import CommonButton from '../../../ui/button/CommonButton'
import FullViewIcon from '../../../ui/icon/FullViewIcon'

const FullViewButton = () => {
  return (
    <CommonButton
      className="rounded-md h-[25px]  hover:bg-[#d0d1d6] flex flex-row items-center  text-white font-medium p-1 cursor-pointer"
      startIcon={<FullViewIcon className="w-5 h-5 " color="#565E6C" />}
    />
  )
}

export default FullViewButton
