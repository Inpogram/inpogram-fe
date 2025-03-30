import React, { useEffect, useRef } from 'react'
import LinkButton from '../../ui/button/LinkButton'
import PenIcon from '../../ui/icon/PenIcon'

type NavBarButtonType = {
  isSelected: boolean
  link: string
  title?: string
  icon?: React.ReactNode
}

const NavBarButton: React.FC<NavBarButtonType> = ({
  link,
  title,
  isSelected,
  icon,
}) => {
  const dRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    dRef!.current!.style.width = `${dRef!.current!.offsetWidth + 2}px`
  }, [])
  return (
    <div ref={dRef} className="inline-flex items-center justify-center">
      <LinkButton
        to={link}
        className={`flex gap-2 text-[#6B6B6B] hover:text-[#242424] py-1 px-2 ${
          isSelected && 'text-[#242424]'
        }`}
        title={title}
        icon={icon}
      />
    </div>
  )
}

export default NavBarButton
