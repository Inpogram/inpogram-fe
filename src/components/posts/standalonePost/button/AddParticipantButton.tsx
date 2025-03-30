import React from 'react'
import CommonButton from '../../../ui/button/CommonButton'
import PlusIcon from '../../../ui/icon/PlusIcon'

const AddParticipantButton = ({handleToggleOpenAddNewParticipantRow}) => {
  return (
    <CommonButton
      className="rounded-md bg-[#3067E9] hover:bg-[#2654c0] flex flex-row items-center lg:gap-2 text-white font-medium  px-2 cursor-pointer h-[25px]"
      startIcon={<PlusIcon className="w-4 h-4 " color="#FFFFFF" />}
      onClick={handleToggleOpenAddNewParticipantRow}
    >
      <p className="lg:block hidden">Add New</p>
    </CommonButton>
  )
}

export default AddParticipantButton
