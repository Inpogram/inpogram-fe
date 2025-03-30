import React, { useEffect, useRef, useState } from 'react'
import CommonButton from '../../../ui/button/CommonButton'
import CaretDownIcon from '../../../ui/icon/CaretDownIcon'

const SaveParticipantButton = ({onClick}) => {
  return (
    <CommonButton
      onClick={onClick}
      className="text-[#4B7BEC]   bg-[#F1F5FE] hover:bg-[#DCE6FB] rounded-md py-2 px-4"
    >
      Save
    </CommonButton>
  )
}

export default SaveParticipantButton
