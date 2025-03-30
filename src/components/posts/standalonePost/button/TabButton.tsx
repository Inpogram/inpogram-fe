import React, { useRef, useEffect } from 'react'
import CommonButton from '../../../ui/button/CommonButton'

type TabButtonType = {
  startIcon: React.ReactNode
  title: string
  isSelected: boolean
}

const TabButton: React.FC<TabButtonType> = ({
  startIcon,
  title,
  isSelected,
}) => {
  const pRef = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    pRef!.current!.style.width = `${pRef!.current!.offsetWidth + 2}px`
  }, [])

  return (
    <CommonButton
      className={`inline-flex items-center justify-center py-4 pr-4 pl-1 border-t-2 hover:font-bold hover:cursor-pointer ${
        isSelected
          ? 'border-t-4 border-[#4B7BEC] font-bold '
          : 'border-transparent'
      } `}
      startIcon={startIcon}
    >
      <p ref={pRef} className="pl-1 text-base  ml-[3px]">
        {title}
      </p>
    </CommonButton>
  )
}

export default TabButton
